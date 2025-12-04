import routes from '@/config/routes';
import { http } from '@/lib/api/http';

export const productService = {
	async top() {
		const res: TopProductResponse = await http.get(routes.api.product.top);
		return res.data;
	},
	async all(searchParams: { [key: string]: string | string[] | undefined }) {
		const queryParts: string[] = [];

		Object.entries(searchParams).forEach(([key, value]) => {
			if (value === undefined) return;

			if (Array.isArray(value)) {
				// Handle multiple values with PHP array syntax
				// example: tag[]=foo&tags[]=bar
				value.forEach((v) => {
					queryParts.push(`${key}[]=${encodeURIComponent(v)}`);
				});
			} else if (key === 'tags') {
				queryParts.push(`tags[]=${encodeURIComponent(value)}`);
			} else {
				queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
			}
		});

		const ep = routes.api.product.all(queryParts.join('&'));

		const res: PaginatedResponse<Product> = await http.get(ep);
		return res;
	},
	async details(slug: string) {
		const res: ProductDetailsResponse = await http.get(
			routes.api.product.details(slug)
		);
		return res;
	},
};
