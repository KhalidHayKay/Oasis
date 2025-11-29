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
import ProductCard, { ProductCardSkeleton } from '@/components/product-card';
import { useTopProducts } from '@/hooks/useTopProducts';

export type sortType = 'recent' | 'price-low' | 'price-high' | 'popular';

const Products = ({ products }: { products: Product[] }) => {
	const {
		displayedProducts,
		sortBy,
		setSortBy,
		handleShowMore,
		hasMore,
		handleCollapse,
	} = useTopProducts(products);

	const filter = [
		{ label: 'Most Recent', value: 'recent' },
		{ label: 'Price: Low to High', value: 'price-low' },
		{ label: 'Price: High to Low', value: 'price-high' },
		{ label: 'Most Popular', value: 'popular' },
	];

	return (
		<section className='spacing-section'>
			<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8'>
				<h1 className='heading-section'>Top Products</h1>

				<Select
					value={sortBy}
					onValueChange={(value) => setSortBy(value as sortType)}
				>
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

			<div className='grid grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-5 sm:gap-x-20 lg:gap-6 mb-6 sm:mb-12'>
				<AnimatePresence mode='popLayout'>
					{!displayedProducts.length
						? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
						: displayedProducts.map((product) => (
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

				<Button
					onClick={hasMore ? handleShowMore : handleCollapse}
					variant='outline'
					className='rounded-full py-5 px-5 sm:py-7 sm:px-10 text-base font-semibold bg-transparent border-grey-500 cursor-pointer'
				>
					{hasMore ? 'Show more' : 'Collapse'}
				</Button>
			</div>
		</section>
	);
};

export default Products;
