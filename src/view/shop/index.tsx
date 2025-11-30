'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

// Mock product data - replace with API calls
const mockProducts = [
	{
		id: '1',
		name: 'Lune Armchair',
		price: { amount: 899, currency: 'USD', discount: 60 },
		featuredImage: '/modern-armchair.png',
		categories: ['Furniture', 'Armchair'],
		createdAt: new Date().toISOString(),
		popularity: 4.5,
		colors: ['#9B8B7F', '#D4C4B8', '#6B7C8E'],
	},
	{
		id: '2',
		name: 'Faux Leaf Chair',
		price: { amount: 129, currency: 'USD', discount: 15 },
		featuredImage: '/modern-designer-chair.png',
		categories: ['Furniture', 'Chair'],
		createdAt: new Date().toISOString(),
		popularity: 4.2,
		colors: ['#D4A574', '#E8C9B0', '#9B7E6F'],
	},
	{
		id: '3',
		name: 'Boucle Accent Chair',
		price: { amount: 44, currency: 'USD', discount: 25 },
		featuredImage: '/stylish-accent-chair.png',
		categories: ['Furniture', 'Chair'],
		createdAt: new Date().toISOString(),
		popularity: 4.5,
		colors: ['#5B7B9E', '#8FA8C4', '#D4A574'],
	},
	{
		id: '4',
		name: 'Modern Sofa',
		price: { amount: 599, currency: 'USD', discount: 20 },
		featuredImage: '/modern-sofa.png',
		categories: ['Furniture', 'Sofa'],
		createdAt: new Date().toISOString(),
		popularity: 4.7,
		colors: ['#2C3E50', '#34495E', '#7F8C8D'],
	},
	{
		id: '5',
		name: 'Classic Recliner',
		price: { amount: 349, currency: 'USD', discount: 10 },
		featuredImage: '/recliner.jpg',
		categories: ['Furniture', 'Recliner'],
		createdAt: new Date().toISOString(),
		popularity: 4.1,
		colors: ['#8B7355', '#A0826D', '#C4A69D'],
	},
	{
		id: '6',
		name: 'Elegant Loveseat',
		price: { amount: 459, currency: 'USD', discount: 18 },
		featuredImage: '/cozy-loveseat.png',
		categories: ['Furniture', 'Loveseat'],
		createdAt: new Date().toISOString(),
		popularity: 4.4,
		colors: ['#D4B8A0', '#8FA8C4', '#5B7B9E'],
	},
	{
		id: '7',
		name: 'Minimalist Stool',
		price: { amount: 149, currency: 'USD', discount: 0 },
		featuredImage: '/minimalist-stool.jpg',
		categories: ['Furniture', 'Stool'],
		createdAt: new Date().toISOString(),
		popularity: 3.8,
		colors: ['#4A4A4A', '#7F8C8D'],
	},
	{
		id: '8',
		name: 'Ottoman Storage',
		price: { amount: 199, currency: 'USD', discount: 12 },
		featuredImage: '/ottoman-storage.jpg',
		categories: ['Furniture', 'Ottoman'],
		createdAt: new Date().toISOString(),
		popularity: 4.3,
		colors: ['#C4A69D', '#D4B8A0'],
	},
];

const categories = [
	'All',
	'Armchair',
	'Chair',
	'Sofa',
	'Recliner',
	'Loveseat',
	'Stool',
	'Ottoman',
];
const sortOptions = [
	'Newest',
	'Price: Low to High',
	'Price: High to Low',
	'Most Popular',
];

const ShopView = () => {
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [selectedSort, setSelectedSort] = useState('Newest');
	const [sortOpen, setSortOpen] = useState(false);

	const filteredProducts = mockProducts.filter((product) => {
		if (selectedCategory === 'All') return true;
		return product.categories.includes(selectedCategory);
	});

	return (
		<main className='min-h-screen bg-background'>
			{/* Header */}
			<div className='border-b border-border'>
				<div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
					<h1 className='text-4xl font-bold text-foreground'>Shop</h1>
					<p className='mt-2 text-muted-foreground'>
						Discover our curated collection of premium furniture
					</p>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8'>
				<div className='flex flex-col lg:flex-row gap-8'>
					{/* Sidebar Filters */}
					<aside className='w-full lg:w-48 flex-shrink-0'>
						<div className='sticky top-4'>
							<h2 className='text-lg font-semibold mb-4 text-foreground'>
								Categories
							</h2>
							<div className='flex flex-wrap lg:flex-col gap-2'>
								{categories.map((category) => (
									<Button
										key={category}
										onClick={() => setSelectedCategory(category)}
										variant={selectedCategory === category ? 'default' : 'outline'}
										className='justify-start w-full lg:w-auto'
									>
										{category}
									</Button>
								))}
							</div>
						</div>
					</aside>

					{/* Products Grid */}
					<div className='flex-1'>
						{/* Sorting Controls */}
						<div className='flex items-center justify-between mb-6'>
							<p className='text-sm text-muted-foreground'>
								Showing {filteredProducts.length} products
							</p>
							<div className='relative'>
								<Button
									variant='outline'
									onClick={() => setSortOpen(!sortOpen)}
									className='flex items-center gap-2'
								>
									{selectedSort}
									<ChevronDown className='w-4 h-4' />
								</Button>
								{sortOpen && (
									<div className='absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-10'>
										{sortOptions.map((option) => (
											<button
												key={option}
												onClick={() => {
													setSelectedSort(option);
													setSortOpen(false);
												}}
												className='w-full text-left px-4 py-2 hover:bg-muted first:rounded-t-lg last:rounded-b-lg'
											>
												{option}
											</button>
										))}
									</div>
								)}
							</div>
						</div>

						{/* Products Grid */}
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
							{filteredProducts.map((product) => (
								<Link key={product.id} href='/'>
									<ProductCard product={product} />
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default ShopView;
