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
			all: (query?: string) => `/api/categories?${query}`,
			content: (slug: string) => `/api/categories/${slug}`,
		},
		tag: {
			all: '/api/tags',
		},
		product: {
			top: '/api/products/top',
			all: (query: string) => `/api/products?${query}`,
			details: (slug: string) => `/api/products/${slug}`,
		},
		Inspiration: {
			all: '/api/inspirations',
		},
		cart: {
			all: '/api/cart',
			add: '/api/cart/items',
			incrementQuantity: (productId: number) =>
				`/api/cart/items/${productId}/quantity/increment`,
			decrementQuantity: (productId: number) =>
				`/api/cart/items/${productId}/quantity/decrement`,
			remove: (productId: number) => `/api/cart/items/${productId}`,
			clear: '/cart',
		},
		auth: {
			provider: (provider: string) => `/api/auth/provider/${provider}`,
			login: '/api/auth/login',
			register: '/api/auth/register',
			logout: '/api/auth/logout',
			email: {
				verify: '/api/auth/email/verify',
				sendCode: '/api/auth/email/send-code',
			},
			password: {
				forgot: '/api/auth/password/forgot',
				reset: '/api/auth/password/reset',
			},
		},
	},
};

export default routes;
