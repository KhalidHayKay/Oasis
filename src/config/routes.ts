const routes = {
	page: {
		home: '/',
		shop: '/shop',
		categories: {
			all: '/categories',
			view: (slug: string) => `/categories/${slug}`,
		},
		blog: '/blog',
		orders: {
			all: '/orders',
			detail: (slug: string | number) => `/orders/${slug}`,
		},
	},
	api: {
		auth: {
			me: '/api/auth/me',
			refresh: '/api/auth/refresh',
			register: '/api/auth/register',
			login: '/api/auth/login',
			socialLogin: '/api/auth/social-login',
			logout: '/api/auth/logout',
			logoutAll: '/api/auth/logout/all',
			provider: (provider: string) => `/api/auth/provider/${provider}`,
			email: {
				verify: '/api/auth/email/verify',
				sendCode: '/api/auth/email/send-code',
			},
			password: {
				forgot: '/api/auth/password/forgot',
				reset: '/api/auth/password/reset',
			},
		},
		category: {
			all: (query?: string) => `/api/categories${query ? `?${query}` : ''}`,
			content: (slug: string) => `/api/categories/${slug}`,
		},
		tag: {
			all: '/api/tags',
		},
		product: {
			top: '/api/products/top',
			all: (query: string) => `/api/products${query ? `?${query}` : ''}`,
			details: (slug: string) => `/api/products/${slug}`,
		},
		Inspiration: {
			all: '/api/inspirations',
		},
		cart: {
			all: '/api/cart',
			add: '/api/cart/items',
			sync: '/api/cart/sync',
			incrementQuantity: (productId: number) =>
				`/api/cart/items/${productId}/quantity/increment`,
			decrementQuantity: (productId: number) =>
				`/api/cart/items/${productId}/quantity/decrement`,
			remove: (productId: number) => `/api/cart/items/${productId}`,
			clear: 'api/cart',
		},
		checkout: {
			get: '/api/checkout',
			make: '/api/checkout',
			address: '/api/checkout/address',
		},
		payment: {
			getIntent: '/api/payment/show',
			intent: 'api/payment/intent',
			confirm: 'api/payment/confirm',
		},
		order: {
			all: '/api/orders',
			get: (id: string) => `api/orders/${id}`,
		},
	},
};

export default routes;
