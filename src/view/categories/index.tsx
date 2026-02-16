'use client';

import CategoryCard from '@/components/category-card';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const CategoriesView = ({ categories }: { categories: Category[] }) => {
	return (
		<main className='min-h-screen bg-background'>
			<div className='py-5'>
				<p className='mt-2 text-muted-foreground'>
					Explore our collections and find the perfect furniture for your home
				</p>
			</div>

			{/* Categories Grid */}
			<div className='py-5'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-6 gap-x-3 lg:gap-x-6'>
					{categories.map((category) => (
						<CategoryCard key={category.id} category={category} />
					))}
				</div>
			</div>

			<div className='pt-10 sm:pt-20'>
				<div className='text-center'>
					<h2 className='text-2xl font-bold text-foreground mb-2'>
						Can{"'"}t find what you{"'"}re looking for?
					</h2>
					<p className='text-muted-foreground mb-6'>
						Browse our complete shop or contact our team for personalized
						recommendations
					</p>
					<Link
						href='/shop'
						className='inline-flex items-center justify-center gap-x-3 px-6 py-3 bg-brand-800 text-primary-foreground font-medium rounded-sm hover:bg-brand-700 hover:scale-102 transition'
					>
						<span className='font-medium'>Browse All Products</span>
						<ArrowUpRight className='size-5' />
					</Link>
				</div>
			</div>
		</main>
	);
};

export default CategoriesView;
