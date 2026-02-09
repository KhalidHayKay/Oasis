import { checkoutService } from '@/services/checkoutService';
import { paymentService } from '@/services/paymentService';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CheckoutState {
	session: CheckoutSession | null;
	payment: {
		clientSecret: string;
		reference: string;
		status: 'pending' | 'successful' | 'failed' | 'cancelled';
	} | null;
	getCheckoutSession: () => Promise<void>;
	getPaymentIntent: (checkoutSessionId: string) => Promise<void>;
	checkout: () => Promise<void>;
	addAddress: (address: Address, checkoutToken: string) => Promise<void>;
	intendPayment: (checkoutToken: string) => Promise<void>;
	confirmPayment: () => Promise<{
		success: boolean;
		error?: string;
		shouldContactSupport?: boolean;
		orderId?: string;
	}>;
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

					get().getPaymentIntent(result.id);
				} catch (error) {
					set({ session: null });
					throw error;
				}
			},

			getPaymentIntent: async (checkoutSessionId) => {
				try {
					const result = await paymentService.getIntent(checkoutSessionId);
					set({
						payment: {
							clientSecret: result.clientSecret,
							reference: result.reference,
							status: 'pending',
						},
					});
				} catch (error) {
					set({ payment: null });
					console.error('Failed to fetch payment intent:', error);
					return;
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
					const { reference, clientSecret } =
						await paymentService.intent(checkoutToken);
					set({
						payment: { clientSecret, reference, status: 'pending' },
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
				const maxDelay = 5000;

				for (let attempt = 0; attempt < maxAttempts; attempt++) {
					try {
						const result = await paymentService.confirm(payment.reference);

						set({
							payment: {
								...payment,
								status: result.status,
							},
						});

						if (result.status === 'successful' && result.orderId) {
							// Order successfully created
							return { success: true, orderId: result.orderId };
						}

						if (result.status === 'failed') {
							// Payment failed
							return {
								success: false,
								error: result.error || 'Payment failed',
								shouldContactSupport: true,
							};
						}

						if (attempt === maxAttempts - 1) {
							// Max attempts reached but still processing
							return {
								success: false,
								error:
									'Order creation is taking longer than expected. Please check your email for confirmation or contact support.',
								shouldContactSupport: true,
							};
						}

						const delayMs = Math.min(initialDelay * Math.pow(1.5, attempt), maxDelay);
						await new Promise((resolve) => setTimeout(resolve, delayMs));
					} catch (error) {
						// if (attempt === maxAttempts - 1) {
						return {
							success: false,
							error: 'Unable to verify payment status. Please contact support.',
							shouldContactSupport: true,
						};
						// }

						// Exponential backoff
						// const delayMs = Math.min(initialDelay * Math.pow(1.5, attempt), maxDelay);
						// await new Promise((resolve) => setTimeout(resolve, delayMs));
					}
				}

				return {
					success: false,
					error: 'Payment confirmation timed out',
					shouldContactSupport: true,
				};
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
