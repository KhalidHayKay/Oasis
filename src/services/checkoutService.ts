import routes from '@/config/routes';
import { http } from '@/lib/api/http';

export const checkoutService = {
	async create(data: CheckoutRequest) {
		const response = await http.post<CheckoutResponse>(
			routes.api.checkout.make,
			data
		);
		return response;
	},
};
