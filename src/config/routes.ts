import { all } from 'axios';
import { view } from 'motion/react-client';
import { Inspiration } from 'next/font/google';

const routes = {
	page: {
		home: '/',
		shop: '/shop',
		categories: {
			all: '/categories',
			view: (category: string) => `/categories/${category}`,
		},
		blog: '/blog',
	},
	api: {
		product: {
			top: 'api/products/top',
			details: (slug: string) => `api/products/${slug}`,
		},
		Inspiration: {
			all: 'api/inspirations',
		},
	},
};

export default routes;
