'use client';

import { useState, useRef, use, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import ProductCard from '@/components/product-card';
import product from '@/app/product/[product]/page';

const Products = ({ products }: { products: Product[] }) => {
	const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
	const [sortBy, setSortBy] = useState('recent');

	const handleShowMore = () => {
		const addition = 4;
		const currentCount = displayedProducts.length;
		const nextCount = Math.min(currentCount + addition, products.length);
		const newProducts = products.slice(0, nextCount);

		setDisplayedProducts(newProducts);
	};

	const handleSorting = (products: Product[], criterion: string) => {
		if (criterion === 'price-low') {
			products.sort((a, b) => a.price - b.price);
		} else if (sortBy === 'price-high') {
			products.sort((a, b) => b.price - a.price);
		} else if (sortBy === 'recent') {
			products.sort(
				(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			);
		} else if (sortBy === 'popular') {
			products.sort((a, b) => b.popularity - a.popularity);
		}
	};

	const hasMore = displayedProducts.length < products.length;

	const filter = [
		{ label: 'Most Recent', value: 'recent' },
		{ label: 'Price: Low to High', value: 'price-low' },
		{ label: 'Price: High to Low', value: 'price-high' },
		{ label: 'Most Popular', value: 'popular' },
	];

	useEffect(() => {
		setDisplayedProducts((prev) => {
			let sortedProducts = [...products];

			const sliced = sortedProducts.slice(0, prev.length === 0 ? 4 : prev.length);

			const withDefaults = sliced.map((p) => ({
				...p,
				createdAt: p.createdAt ?? new Date().toISOString(),
				popularity: p.popularity ?? 0,
			}));

			handleSorting(withDefaults, sortBy);

			return withDefaults;
		});
	}, [sortBy, products]);

	return (
		<section className='pt-8 sm:pt-12 md:pt-16'>
			<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8'>
				<h1 className='text-2xl sm:text-4xl font-semibold text-foreground'>
					Top Products
				</h1>

				<Select value={sortBy} onValueChange={setSortBy}>
					<SelectTrigger className='w-60 md:w-48 p-7 rounded-2xl text-lg'>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{filter.map((f, i) => (
							<SelectItem key={i} value={f.value} className='text-base'>
								{f.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className='grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-10 lg:gap-6 mb-6 sm:mb-12'>
				<AnimatePresence mode='popLayout'>
					{displayedProducts.map((product, index) => (
						<motion.div
							key={product.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{
								duration: 0.4,
								ease: 'easeOut',
							}}
						>
							<ProductCard product={product} />
						</motion.div>
					))}
				</AnimatePresence>
			</div>

			<div className='flex flex-col items-center gap-6'>
				<p className='text-xs sm:text-sm text-muted-foreground'>
					Showing {displayedProducts.length} of {products.length} results
				</p>

				<div
					className='relative w-[200px] sm:w-[400px] h-0.5 bg-grey-300 before:absolute before:left-0 before:top-0 before:w-(--progress) before:h-full before:bg-accent-foreground delay-200'
					style={
						{
							'--progress': `${(displayedProducts.length / products.length) * 100}%`,
						} as React.CSSProperties
					}
				>
					{/* The progress bar's before pseudo-element will cover the width dynamically */}
				</div>

				{/* might implement show less later */}
				<Button
					onClick={handleShowMore}
					disabled={!hasMore}
					variant='outline'
					className='rounded-full py-5 px-5 sm:py-7 sm:px-10 text-base font-semibold bg-transparent border-grey-500 cursor-pointer'
				>
					Show more
				</Button>
			</div>
		</section>
	);
};

export default Products;
