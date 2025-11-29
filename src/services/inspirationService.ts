import routes from '@/config/routes';
import { http } from '@/lib/api/http';

export const inspirationService = {
	async all() {
		try {
			const res: InspirationResponse = await http.get(routes.api.Inspiration.all);
			return res.data;
		} catch (e) {
			throw e;
		}
	},
};
