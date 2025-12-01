import routes from '@/config/routes';
import { http } from '@/lib/api/http';

export const categoryService = {
	async content(slug: string) {
		const res: categoryContentResponse = await http.get(
			routes.api.category.content(slug)
		);
		return res;
	},
};
