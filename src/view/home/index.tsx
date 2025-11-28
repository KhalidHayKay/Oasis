'use client';

import Hero from './hero';
import Category from './category';
import Products from './products';
import { http } from '@/lib/api/http';
import { useEffect, useState } from 'react';
import FAQ from './faq';
import Inspiration from './inspoiration';

const HomeView = ({ categories }: { categories: any }) => {
	const [products, setProducts] = useState<Product[]>([]);

	const catData = [
		{
			id: 1,
			title: 'Sitting Room',
			image: '/images/cat/sitting.png',
			href: '/shop/sitting-room',
			isDoubleCol: true,
		},
		{
			id: 2,
			title: 'Accessories',
			image: '/images/cat/accessories.png',
			href: '/shop/accessories',
			isDoubleCol: false,
		},
		{
			id: 3,
			title: 'Kitchen',
			image: '/images/cat/kitchen.png',
			href: '/shop/kitchen',
			isDoubleCol: false,
		},
		{
			id: 4,
			title: 'Bedroom',
			image: '/images/cat/bed.png',
			href: '/shop/bedroom',
			isDoubleCol: true,
		},
	];

	useEffect(() => {
		const fetchProducts = async () => {
			const productData = await http.get('api/products');

			if (productData) {
				console.log(productData);
				setProducts(productData.data as Product[]);
			}
		};

		fetchProducts();
	}, []);

	return (
		<section className='bg-white'>
			<Hero />
			<Category categories={catData} />
			<Products products={products} />
			{/* <Inspiration /> */}
			{/* <FAQ /> */}
		</section>
	);
};

export default HomeView;
