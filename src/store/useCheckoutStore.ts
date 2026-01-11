import { checkoutService } from '@/services/checkoutService';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CheckoutState {
	session: CheckoutSession | null;
	checkout: (data: CheckoutRequest) => Promise<void>;
}

export const useCheckoutStore = create<CheckoutState>()(
	persist(
		(set, get) => ({
			session: null,

			checkout: async (data) => {
				try {
					const result = await checkoutService.create(data);
					set({ session: result.checkout_session });
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
		}
	)
);
