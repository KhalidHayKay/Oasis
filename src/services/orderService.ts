import routes from '@/config/routes';
import { httpServer } from '@/lib/api/http-server';

export const orderService = {
	async all() {
		const response = await httpServer.get<{ data: OrderPreview[] }>(
			routes.api.order.all,
		);
		return response.data;
	},

	async getById(id: string) {
		const response = await httpServer.get<{ data: Order }>(
			routes.api.order.get(id),
		);
		return response.data;
	},
};
