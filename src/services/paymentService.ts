import routes from '@/config/routes';
import { http } from '@/lib/api/http';

export const paymentService = {
	async intent(checkoutToken: string) {
		const response = await http.post<PaymentIntentResponse>(
			routes.api.checkout['payment-intent'],
			{ checkout_token: checkoutToken },
		);
		return response;
	},
};
