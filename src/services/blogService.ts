import routes from '@/config/routes';
import { http } from '@/lib/api/http';

export const blogService = {
	async all(page: number = 1) {
		const res = await http.get<PaginatedResponse<Blog>>(
			`${routes.api.blog.all}?min=${page}`,
		);
		return res;
	},

	async content(slug: string) {
		const res = await http.get<{ data: BlogDetail }>(
			routes.api.blog.content(slug),
		);
		return res.data;
	},

	async next(nextUrl: string | null) {
		if (!nextUrl) return null;
		const res = await http.get<PaginatedResponse<Blog>>(nextUrl);
		return res;
	},
};
