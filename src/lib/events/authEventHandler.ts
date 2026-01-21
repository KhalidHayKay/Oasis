import { authEvent } from './authEvent';
import { useCartStore } from '@/store/useCartStore';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { toast } from 'sonner';

export function mountAuthEventHandlers() {
	// Cart event handlers
	authEvent.on('login', async () => {
		try {
			await useCartStore.getState().syncGuestCartToBackend();
		} catch (error) {
			console.error('Cart sync failed:', error);
			toast.error('Cart sync failed. Please refresh the page.', {
				duration: 2000,
			});
		}
	});

	authEvent.on('initialized', async () => {
		const { hasSyncedOnLogin, syncGuestCartToBackend, loadCartFromBackend } =
			useCartStore.getState();

		try {
			if (!hasSyncedOnLogin) {
				await syncGuestCartToBackend();
			} else {
				await loadCartFromBackend();
			}
		} catch (error) {
			console.error('Failed to load cart on auth init:', error);
			toast.error('Failed to load cart. Please refresh the page.', {
				duration: 2000,
			});
		}
	});

	authEvent.on('logout', () => {
		useCartStore.setState({ items: [] });
		useCartStore.getState().resetSyncFlag();
	});

	// Checkout event handlers
	const pullSesh = async (user: User | null) => {
		if (user) {
			try {
				await useCheckoutStore.getState().getCheckoutSession();
			} catch (error) {
				console.error('Failed to load checkout session:', error);
			}
		}
	};
	authEvent.on('login', (user) => pullSesh(user));

	authEvent.on('initialized', (user) => pullSesh(user));

	authEvent.on('logout', () => {
		useCheckoutStore.setState({ session: null });
	});
}
