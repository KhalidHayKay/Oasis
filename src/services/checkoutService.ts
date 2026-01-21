import routes from '@/config/routes';
import { http } from '@/lib/api/http';

export const checkoutService = {
	async get() {
		const response = await http.get<CheckoutSession>(routes.api.checkout.get);
		return response;
	},

	async create(data: CheckoutRequest) {
		const response = await http.post<CheckoutResponse>(
			routes.api.checkout.make,
			data,
		);
		return response;
	},

	async makeOrder() {
		const response = await http.post(routes.api.order.make);
		return response;
	},
};
