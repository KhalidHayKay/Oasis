import routes from '@/config/routes';
import { http } from '@/lib/api/http';

export const checkoutService = {
	async get() {
		const response = await http.get<{ data: CheckoutSession }>(
			routes.api.checkout.get,
		);
		return response.data;
	},

	async create() {
		const response = await http.post<CheckoutResponse>(routes.api.checkout.make);
		return response;
	},

	async address(data: CheckoutRequest) {
		const response = await http.post<CheckoutResponse>(
			routes.api.checkout.address,
			data,
		);
		return response;
	},

	async makeOrder() {
		const response = await http.post(routes.api.order.make);
		return response;
	},
};
