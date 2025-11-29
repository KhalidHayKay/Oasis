import { all } from 'axios';
import { Inspiration } from 'next/font/google';

const routes = {
	page: {
		home: '/',
		shop: '/shop',
		categories: '/categories',
		blog: '/blog',
	},
	api: {
		product: {
			top: 'api/products/top',
		},
		Inspiration: {
			all: 'api/inspirations',
		},
	},
};

export default routes;
