import { checkoutService } from '@/services/checkoutService';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CheckoutState {
	session: CheckoutSession | null;
	getCheckoutSession: () => Promise<void>;
	checkout: () => Promise<void>;
	addAddress: (address: Address) => Promise<void>;
}

export const useCheckoutStore = create<CheckoutState>()(
	persist(
		(set, get) => ({
			session: null,

			getCheckoutSession: async () => {
				try {
					const result = await checkoutService.get();
					set({ session: result });
				} catch (error) {
					set({ session: null });
					throw error;
				}
			},

			checkout: async () => {
				try {
					const result = await checkoutService.create();
					console.log(result);
					set({ session: result.checkoutSession });
				} catch (error) {
					throw error;
				}
			},

			addAddress: async (address) => {
				const data = {
					...address,
					checkout_token: get().session?.publicToken as string,
				};

				try {
					const result = await checkoutService.address(data);
					set({ session: result.checkoutSession });
				} catch (error) {
					throw error;
				}
			},
		}),
		{
			name: 'checkout-store',
			partialize: (state) => ({
				session: state.session,
			}),
		},
	),
);
