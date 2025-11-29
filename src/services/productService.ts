import routes from '@/config/routes';
import { http } from '@/lib/api/http';

export const productService = {
	async top() {
		try {
			const res: TopProductResponse = await http.get(routes.api.product.top);
			return res.data;
		} catch (e) {
			throw e;
		}
	},
	//   async details(slug: string) {
	//     return http.get(`/products/${slug}`);
	//   },
};
