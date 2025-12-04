import routes from '@/config/routes';
import { http } from '@/lib/api/http';

export const categoryService = {
	async all(query?: string) {
		const res: CategoriesResponse = await http.get(
			routes.api.category.all(query)
		);
		return res.data;
	},

	async content(slug: string) {
		const res: CategoryContentResponse = await http.get(
			routes.api.category.content(slug)
		);
		return res;
	},

	async tags() {
		const res: CategoryTagResponse = await http.get(routes.api.tag.all);
		return res.data;
	},
};
