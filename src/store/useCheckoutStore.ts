import { checkoutService } from '@/services/checkoutService';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CheckoutState {
	session: CheckoutSession | null;
	getCheckoutSession: () => Promise<void>;
	checkout: (data: CheckoutRequest) => Promise<void>;
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
					throw error;
				}
			},

			checkout: async (data) => {
				try {
					const result = await checkoutService.create(data);
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
