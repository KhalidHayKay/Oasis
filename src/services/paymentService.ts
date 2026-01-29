import routes from '@/config/routes';
import { http } from '@/lib/api/http';

export const paymentService = {
	async intent(checkoutToken: string) {
		const response = await http.post<PaymentIntentResponse>(
			routes.api.payment.intent,
			{ checkout_token: checkoutToken },
		);
		return response;
	},

	async confirm(reference: string) {
		const response = await http.post<PaymentConfirmResponse>(
			routes.api.payment.confirm,
			{ reference },
		);

		return response;
	},
};
