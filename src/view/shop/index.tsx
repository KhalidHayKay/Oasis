'use client';

import { useShopFilters } from '@/hooks/useShopFilters';
import Catalogue from './catalogue';
import ProductSortDropdown from '@/components/product/product-sort-dropdown';
import { useProductSorting } from '@/hooks/useProductSorting';
import { SlidersHorizontal } from 'lucide-react';
import ShopFilter from '@/components/shop-filter';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import PopularCategories from './popular-categories';

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

	const {
		filters: { tags },
	} = filterHook;

	return (
		<>
			<div className='mt-5'>
				<div className='flex flex-col lg:flex-row gap-8'>
					<aside className='hidden lg:block w-80 sticky top-24 self-start lg:max-h-[calc(100vh-7rem)] overflow-y-auto scrollbar-hide'>
						<ShopFilter categories={categories} filterHook={filterHook} />
					</aside>

					<div className='flex-1'>
						<div className='grid grid-cols-1 md:grid-cols-[auto_1fr_1fr] lg:grid-cols-2 items-center gap-4 mb-8'>
							{/* Mobile Filter Drawer */}
							<Drawer direction='left'>
								<DrawerTrigger className='w-fit lg:hidden inline-flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-accent transition-colors'>
									<SlidersHorizontal className='size-4' />
									<span className='font-medium'>Filters</span>
								</DrawerTrigger>
								<DrawerContent className='overflow-y-auto'>
									<ShopFilter filterHook={filterHook} categories={categories} />
								</DrawerContent>
							</Drawer>

							<p className='row-start-3 md:row-start-1 ml-2 sm:ml-0 text-sm font-semibold text-gray-500'>
								Showing <span className='text-base text-foreground'>{meta.to}</span>{' '}
								results out of{' '}
								<span className='text-base text-foreground'>{meta.total}</span> for{' '}
								<span className='text-base text-foreground'>
									{tags && tags.length > 0
										? tags.length === 1
											? tags[0]
											: `${tags[0]} and others`
										: 'All'}
								</span>
							</p>

							<div className='md:justify-self-end'>
								<ProductSortDropdown value={sortBy} onChange={setSortBy} />
							</div>
						</div>

						<Catalogue products={sortedProducts} />
					</div>
				</div>
			</div>

			<PopularCategories categories={popularCategories} />
		</>
	);
};

export default ShopView;
