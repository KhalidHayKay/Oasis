'use client';

import CategoryCard from '@/components/category-card';
import Link from 'next/link';

const CategoriesView = ({ categories }: { categories: Category[] }) => {
	return (
		<main className='min-h-screen bg-background'>
			{/* Header */}
			<div className='border-b border-border'>
				<div className='py-5'>
					<h1 className='text-3xl lg:text-4xl font-bold text-foreground'>
						Categories
					</h1>
					<p className='mt-2 text-muted-foreground'>
						Explore our collections and find the perfect furniture for your home
					</p>
				</div>
			</div>

			{/* Categories Grid */}
			<div className='py-5'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-6 gap-x-3 lg:gap-x-6'>
					{categories.map((category) => (
						<CategoryCard key={category.id} category={category} />
					))}
				</div>
			</div>

			{/* CTA Section */}
			<div className='bg-primary/5 border-t border-b border-border'>
				<div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
					<div className='text-center'>
						<h2 className='text-2xl font-bold text-foreground mb-2'>
							Can{"'"}t find what you{"'"}re looking for?
						</h2>
						<p className='text-muted-foreground mb-6'>
							Browse our complete shop or contact our team for personalized
							recommendations
						</p>
						<Link href='/shop'>
							<button className='inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors'>
								Browse All Products
							</button>
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
};

export default CategoriesView;
