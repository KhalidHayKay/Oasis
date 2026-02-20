import routes from '@/config/routes';
import { http } from '@/lib/api/http';
// import { httpServer } from '@/lib/api/http-server';

export const orderService = {
	async all() {
		const response = await http.get<{ data: OrderPreview[] }>(
			routes.api.order.all,
		);
		return response.data;
	},

	async getById(id: string) {
		const response = await http.get<{ data: Order }>(routes.api.order.get(id));
		return response.data;
	},
};
