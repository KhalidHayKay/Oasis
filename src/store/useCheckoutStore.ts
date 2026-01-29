import { checkoutService } from '@/services/checkoutService';
import { paymentService } from '@/services/paymentService';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CheckoutState {
	session: CheckoutSession | null;
	payment: {
		clientSecret: string;
		reference: string;
		status: 'pending' | 'succeeded' | 'failed';
	} | null;
	getCheckoutSession: () => Promise<void>;
	checkout: () => Promise<void>;
	addAddress: (address: Address, checkoutToken: string) => Promise<void>;
	intendPayment: (checkoutToken: string) => Promise<void>;
	confirmPayment: () => Promise<void>;
}

export const useCheckoutStore = create<CheckoutState>()(
	persist(
		(set, get) => ({
			session: null,
			payment: null,

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
					set({ session: result.session });
				} catch (error) {
					throw error;
				}
			},

			addAddress: async (address, checkoutToken) => {
				const data = {
					...address,
					checkout_token: checkoutToken,
				};

				try {
					const result = await checkoutService.address(data);
					set({ session: result.session });
				} catch (error) {
					throw error;
				}
			},

			intendPayment: async (checkoutToken) => {
				try {
					const { checkoutSession, reference, clientSecret } =
						await paymentService.intent(checkoutToken);
					set({
						session: checkoutSession,
						payment: { status: 'pending', clientSecret, reference },
					});
				} catch (error) {
					throw error;
				}
			},

			confirmPayment: async () => {
				const payment = get().payment;
				if (!payment) {
					throw new Error('No payment intent found');
				}

				const maxAttempts = 10;
				const initialDelay = 500;

				for (let attempt = 0; attempt < maxAttempts; attempt++) {
					try {
						const result = await paymentService.confirm(payment.reference);
						set({
							payment: {
								...payment,
								status: result.status,
							},
						});
						return;
					} catch (error) {
						if (attempt === maxAttempts - 1) {
							throw error; // Final attempt failed
						}

						// Wait before next attempt (exponential backoff)
						const delayMs = initialDelay * Math.pow(1.5, attempt);
						await new Promise((resolve) => setTimeout(resolve, delayMs));
					}
				}
			},
		}),
		{
			name: 'checkout-store',
			partialize: (state) => ({
				session: state.session,
				payment: state.payment,
			}),
		},
	),
);
