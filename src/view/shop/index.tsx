'use client';

import { useShopFilters } from '@/hooks/useShopFilters';
import Catalogue from './catalogue';
import ProductSortDropdown from '@/components/product/product-sort-dropdown';
import { useProductSorting } from '@/hooks/useProductSorting';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ShopFilter from '@/components/shop-filter';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import PopularCategories from './popular-categories';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

type ResultCountProps = {
	meta: PaginationMeta;
	tags?: string[];
};

const ResultCount = ({ meta, tags }: ResultCountProps) => (
	<div className='flex-1 min-w-0'>
		<p className='text-sm text-gray-600'>
			Showing{' '}
			<span className='font-semibold text-gray-900'>
				{meta.from || 0}-{meta.to || 0}
			</span>{' '}
			of <span className='font-semibold text-gray-900'>{meta.total || 0}</span>{' '}
			results
			{tags && tags.length > 0 && (
				<>
					{' '}
					for{' '}
					<span className='font-semibold text-gray-900'>
						{tags.length === 1 ? tags[0] : `${tags[0]} +${tags.length - 1}`}
					</span>
				</>
			)}
		</p>
	</div>
);

const ShopView = ({
	products: { data: products, meta },
	tags: categories,
	popularCategories,
}: {
	products: PaginatedResponse<Product>;
	tags: Category[];
	popularCategories: Category[];
}) => {
	const filterHook = useShopFilters();
	const { sortBy, setSortBy, sortedProducts } = useProductSorting(products);
	const [searchQuery, setSearchQuery] = useState(
		filterHook.filters.search || '',
	);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	// Debounce search to avoid excessive requests
	const debouncedSearch = useDebounce(searchQuery, 500);

	// Update search filter when debounced value changes
	useEffect(() => {
		if (debouncedSearch !== filterHook.filters.search) {
			filterHook.updateFilters({ search: debouncedSearch || undefined });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearch]);

	const handleApplyFilters = (filters: {
		tags: string[];
		min_price?: number;
		max_price?: number;
	}) => {
		filterHook.updateFilters({
			tags: filters.tags,
			min_price: filters.min_price?.toString(),
			max_price: filters.max_price?.toString(),
		});
		setIsDrawerOpen(false);
	};

	const {
		filters: { tags },
	} = filterHook;

	const activeFilterCount =
		(tags?.length || 0) +
		(filterHook.filters.min_price ? 1 : 0) +
		(filterHook.filters.max_price ? 1 : 0);

	return (
		<>
			<div className='py-6 lg:py-8 flex flex-col lg:flex-row gap-6 lg:gap-8'>
				{/* Desktop Filter Sidebar */}
				<aside className='hidden lg:block w-72 shrink-0'>
					<div className='sticky top-24 h-[calc(100vh-7rem)] overflow-y-auto scrollbar-hide'>
						<ShopFilter
							categories={categories}
							onApplyFilters={handleApplyFilters}
							initialFilters={filterHook.filters}
						/>
					</div>
				</aside>

				{/* Main Content Area */}
				<div className='flex-1 min-w-0'>
					{/* Top Controls Bar */}
					<div className='mb-6'>
						<div className='flex flex-col gap-4'>
							{/* Search Bar */}
							<div className='relative'>
								<Search className='absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400' />
								<Input
									type='text'
									placeholder='Search products...'
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className='pl-10 pr-10 h-11 border-gray-300 rounded-lg'
								/>
								{searchQuery && (
									<button
										onClick={() => setSearchQuery('')}
										className='absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-md transition-colors'
									>
										<X className='size-4 text-gray-400' />
									</button>
								)}
							</div>

							{/* Results Count + Sort + Mobile Filter */}
							<div className='flex items-center justify-start sm:justify-between gap-4'>
								{/* Mobile Filter Button */}
								<Drawer
									direction='left'
									open={isDrawerOpen}
									onOpenChange={setIsDrawerOpen}
								>
									<DrawerTrigger className='lg:hidden inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'>
										<SlidersHorizontal className='size-4' />
										<span className='text-sm font-medium'>Filters</span>
										{activeFilterCount > 0 && (
											<span className='ml-0.5 px-1.5 py-0.5 bg-black text-white rounded text-xs'>
												{activeFilterCount}
											</span>
										)}
									</DrawerTrigger>
									<DrawerContent className='h-full min-w-[85vw] sm:min-w-fit max-w-sm'>
										<ShopFilter
											categories={categories}
											onApplyFilters={handleApplyFilters}
											onClose={() => setIsDrawerOpen(false)}
											initialFilters={filterHook.filters}
										/>
									</DrawerContent>
								</Drawer>

								{/* Results Count */}
								<div className='hidden sm:block'>
									<ResultCount tags={tags} meta={meta} />
								</div>

								{/* Sort Dropdown */}
								{/* <div className='shrink-0'> */}
								<ProductSortDropdown value={sortBy} onChange={setSortBy} />
								{/* </div> */}
							</div>

							<div className='sm:hidden'>
								<ResultCount tags={tags} meta={meta} />
							</div>

							{/* Active Filters Chips */}
							{(tags && tags.length > 0) ||
							filterHook.filters.min_price ||
							filterHook.filters.max_price ||
							searchQuery ? (
								<div className='flex flex-wrap items-center gap-2 pb-2 border-b border-gray-200'>
									<span className='text-sm text-gray-600'>Applied:</span>
									{tags?.map((tagSlug) => {
										const tag = categories
											.flatMap((c) => c.tags || [])
											.find((t) => t.slug === tagSlug);
										return tag ? (
											<span
												key={tagSlug}
												className='inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full'
											>
												{tag.name}
												<button
													onClick={() => filterHook.toggleTag(tagSlug)}
													className='hover:bg-gray-200 rounded-full p-0.5'
												>
													<X className='size-3.5' />
												</button>
											</span>
										) : null;
									})}
									{(filterHook.filters.min_price || filterHook.filters.max_price) && (
										<span className='inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full'>
											${filterHook.filters.min_price || '0'} - $
											{filterHook.filters.max_price || '1000'}
											<button
												onClick={() => filterHook.updatePriceRange(undefined, undefined)}
												className='hover:bg-gray-200 rounded-full p-0.5'
											>
												<X className='size-3.5' />
											</button>
										</span>
									)}
									{searchQuery && (
										<span className='inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full'>
											&quot;{searchQuery}&quot;
											<button
												onClick={() => setSearchQuery('')}
												className='hover:bg-gray-200 rounded-full p-0.5'
											>
												<X className='size-3.5' />
											</button>
										</span>
									)}
									<button
										onClick={() => {
											filterHook.clearFilters();
											setSearchQuery('');
										}}
										className='text-sm text-gray-600 hover:text-gray-900 underline'
									>
										Clear all
									</button>
								</div>
							) : null}
						</div>
					</div>

					{/* Product Catalogue */}
					<Catalogue products={sortedProducts} isPending={filterHook.isPending} />
				</div>
			</div>

			<PopularCategories categories={popularCategories} />
		</>
	);
};

export default ShopView;
