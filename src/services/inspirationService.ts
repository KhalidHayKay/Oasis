import routes from '@/config/routes';
import { http } from '@/lib/api/http';

export const inspirationService = {
	async all() {
		const res: InspirationResponse = await http.get(routes.api.inspiration.all);
		return res.data;
	},
};
