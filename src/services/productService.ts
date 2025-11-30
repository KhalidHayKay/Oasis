import routes from '@/config/routes';
import { http } from '@/lib/api/http';

export const productService = {
	async top() {
		const res: TopProductResponse = await http.get(routes.api.product.top);
		return res.data;
	},
	async details(slug: string) {
		const res: ProductDetailsResponse = await http.get(
			routes.api.product.details(slug)
		);
		return res;
	},
};
