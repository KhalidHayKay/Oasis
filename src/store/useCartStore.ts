import { cartService } from '@/services/cartService';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAuthStore } from './useAuthStore';
import { processDiscount } from '@/lib/utils';

interface CartState {
	// State
	items: CartItem[];
	isLoading: boolean;
	isSyncing: boolean;
	hasSyncedOnLogin: boolean;

	// Actions
	addItem: (
		product: ProductDetails,
		quantity: number,
		color: string,
	) => Promise<void>;
	removeItem: (id: number) => Promise<void>;
	updateQuantity: (item: CartItem, quantity: number) => Promise<void>;
	clearCart: () => Promise<void>;

	loadCartFromBackend: () => Promise<void>;
	syncGuestCartToBackend: () => Promise<void>;
	resetSyncFlag: () => void;

	getTotalItems: () => number;
	getTotalPrice: () => number;
}

function upsertById(items: CartItem[], incoming: CartItem) {
	const index = items.findIndex((i) => i.id === incoming.id);

	if (index !== -1) {
		const copy = [...items];
		copy[index] = incoming;
		return copy;
	}

	return [...items, incoming];
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			// Initial state
			items: [],
			isLoading: false,
			isSyncing: false,
			hasSyncedOnLogin: false,

			addItem: async (product, quantity, color) => {
				const isAuthenticated = useAuthStore.getState().isAuthenticated;

				if (isAuthenticated) {
					set({ isSyncing: true });

					try {
						const item = await cartService.add({
							productId: product.id,
							quantity,
							color,
						});

						set((state) => ({
							items: upsertById(state.items, item),
							isSyncing: false,
						}));
					} catch (error) {
						set({ isSyncing: false });
						throw error;
					}

					return;
				}

				// Guest user - local storage only
				set((state) => {
					const existingItemIndex = state.items.findIndex(
						(existingItem) =>
							existingItem.productId === product.id && existingItem.color === color,
					);

					if (existingItemIndex > -1) {
						const newItems = [...state.items];
						newItems[existingItemIndex].quantity += quantity;
						return { items: newItems };
					}

					const newItem: CartItem = {
						id: Date.now(),
						productId: product.id,
						productName: product.name,
						productImage: product.featuredImage,
						productDesc: product.description,
						color,
						unitPrice: String(processDiscount(product.price)),
						quantity,
						subtotal: (Number(product.price) * quantity).toString(),
					};

					return { items: [...state.items, newItem] };
				});
			},

			removeItem: async (id) => {
				const isAuthenticated = useAuthStore.getState().isAuthenticated;

				if (isAuthenticated) {
					set({ isSyncing: true });

					try {
						await cartService.remove(id);
						set((state) => ({
							items: state.items.filter((item) => item.id !== id),
							isSyncing: false,
						}));
					} catch (error) {
						set({ isSyncing: false });
						throw error;
					}
				} else {
					set((state) => ({
						items: state.items.filter((item) => item.id !== id),
					}));
				}
			},

			updateQuantity: async (item, quantity = 1) => {
				if (quantity < 1) {
					await get().removeItem(item.id);
					return;
				}

				const isAuthenticated = useAuthStore.getState().isAuthenticated;

				if (isAuthenticated) {
					set({ isSyncing: true });

					try {
						let updatedItem: CartItem;

						if (quantity > item.quantity) {
							updatedItem = await cartService.incrementItemQuantity(
								item.id,
								quantity - item.quantity,
							);
						} else if (quantity < item.quantity) {
							updatedItem = await cartService.decrementItemQuantity(
								item.id,
								item.quantity - quantity,
							);
						} else {
							set({ isSyncing: false });
							return;
						}

						set((state) => ({
							items: upsertById(state.items, updatedItem),
							isSyncing: false,
						}));
					} catch (error) {
						set({ isSyncing: false });
						console.error('Failed to update quantity:', error);
						throw error;
					}
				} else {
					set((state) => ({
						items: state.items.map((i) =>
							i.id === item.id ? { ...i, quantity } : i,
						),
					}));
				}
			},

			clearCart: async () => {
				const isAuthenticated = useAuthStore.getState().isAuthenticated;

				if (isAuthenticated) {
					set({ isSyncing: true });
					try {
						await cartService.clear();
						set({ items: [], isSyncing: false });
					} catch (error) {
						set({ isSyncing: false });
						throw error;
					}
				} else {
					set({ items: [] });
				}
			},

			// Load cart from backend (called on auth init)
			loadCartFromBackend: async () => {
				set({ isLoading: true });

				try {
					const backendCart = await cartService.get();
					set({ items: backendCart, isLoading: false });
				} catch (error) {
					console.error('Failed to load cart:', error);
					set({ isLoading: false });
					throw error;
				}
			},

			// Sync guest cart to backend (called after login)
			syncGuestCartToBackend: async () => {
				const { items, hasSyncedOnLogin } = get();

				// Prevent double sync
				if (hasSyncedOnLogin || items.length === 0) {
					await get().loadCartFromBackend();
					return;
				}

				set({ isSyncing: true });

				try {
					// Filter out temporary IDs (guest items)
					const guestItems = items.filter((item) => item.id > 1000000000000);

					if (guestItems.length > 0) {
						await cartService.sync(guestItems);
					}

					// Reload cart from backend to get the merged result
					await get().loadCartFromBackend();

					set({ hasSyncedOnLogin: true, isSyncing: false });
				} catch (error) {
					console.error('Failed to sync cart:', error);
					set({
						isSyncing: false,
					});
					throw error;
				}
			},

			resetSyncFlag: () => {
				set({ hasSyncedOnLogin: false });
			},

			getTotalItems: () => {
				const { items } = get();
				return items.reduce((total, item) => total + item.quantity, 0);
			},

			getTotalPrice: () => {
				const { items } = get();
				return items.reduce(
					(total, item) => total + Number(item.unitPrice) * item.quantity,
					0,
				);
			},
		}),
		{
			name: 'cart-storage',
			partialize: (state) => ({
				items: state.items,
				hasSyncedOnLogin: state.hasSyncedOnLogin,
			}),
		},
	),
);
