const routes = {
	page: {
		home: '/',
		shop: '/shop',
		categories: {
			all: '/categories',
			view: (slug: string) => `/categories/${slug}`,
		},
		blog: '/blog',
	},
	api: {
		category: {
			all: (query?: string) => `api/categories?${query}`,
			content: (slug: string) => `api/categories/${slug}`,
		},
		tag: {
			all: '/api/tags',
		},
		product: {
			top: 'api/products/top',
			all: (query: string) => `api/products?${query}`,
			details: (slug: string) => `api/products/${slug}`,
		},
		Inspiration: {
			all: 'api/inspirations',
		},
	},
};

export default routes;
