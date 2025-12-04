import { useShopFilters } from '@/hooks/useShopFilters';
import { cn } from '@/lib/utils';
import { Checkbox } from '@radix-ui/react-checkbox';
import { Slider } from '@radix-ui/react-slider';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';

interface ShopFilterProps {
	categories: Category[];
	filterHook: ReturnType<typeof useShopFilters>;
}

const ShopFilter = ({ categories, filterHook }: ShopFilterProps) => {
	const { filters, toggleTag, updatePriceRange, clearFilters, isPending } =
		filterHook;

	// UI state for collapsible categories
	const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
		new Set(categories?.length > 0 ? [categories[0].id] : [])
	);

	// Local state for price inputs (for better UX before committing)
	const [priceRange, setPriceRange] = useState({
		min: filters.min_price || '0',
		max: filters.max_price || '1000',
	});

	useEffect(() => {
		queueMicrotask(() => {
			setPriceRange({
				min: filters.min_price || '0',
				max: filters.max_price || '1000',
			});
		});
	}, [filters.min_price, filters.max_price]);

	const toggleCategoryExpansion = (categoryId: string) => {
		const newExpanded = new Set(expandedCategories);
		if (newExpanded.has(categoryId)) {
			newExpanded.delete(categoryId);
		} else {
			newExpanded.add(categoryId);
		}
		setExpandedCategories(newExpanded);
	};

	const handleToggleTag = (tagSlug: string) => {
		toggleTag(tagSlug);
	};

	const handlePriceRangeChange = (values: number[]) => {
		setPriceRange({
			min: values[0].toString(),
			max: values[1].toString(),
		});
	};

	const handlePriceCommit = (values: number[]) => {
		updatePriceRange(values[0], values[1]);
	};

	const handlePriceInputChange = (type: 'min' | 'max', value: string) => {
		setPriceRange((prev) => ({ ...prev, [type]: value }));
	};

	const handlePriceInputBlur = () => {
		const min = Number(priceRange.min) || 0;
		const max = Number(priceRange.max) || 1000;

		// Ensure min is not greater than max
		if (min > max) {
			setPriceRange({ min: max.toString(), max: max.toString() });
			updatePriceRange(max, max);
		} else {
			updatePriceRange(min, max);
		}
	};

	const hasActiveFilters =
		(filters.tags && filters.tags.length > 0) ||
		filters.min_price !== undefined ||
		filters.max_price !== undefined;

	if (!categories || categories.length === 0) {
		return (
			<div className='w-full max-w-sm border rounded-lg bg-card p-6'>
				<h2 className='text-xl font-bold mb-6 text-foreground'>Filter Products</h2>
				<p className='text-sm text-muted-foreground'>No categories available</p>
			</div>
		);
	}

	return (
		<div
			className={cn(
				'border rounded-lg bg-card p-6 transition-opacity',
				isPending ? 'opacity-60' : 'opacity-100'
			)}
		>
			<div className='flex items-center justify-between mb-6'>
				<h2 className='text-xl font-bold text-foreground'>Filters</h2>
				{hasActiveFilters && (
					<button
						onClick={clearFilters}
						disabled={isPending}
						className='text-sm text-primary hover:underline disabled:opacity-50 font-medium'
					>
						Clear all
					</button>
				)}
			</div>

			<div className='space-y-6'>
				{/* Categories Section */}
				<div>
					<h3 className='text-sm font-semibold mb-3 text-foreground'>Category</h3>
					<div className='space-y-0 border rounded-lg overflow-hidden bg-background'>
						{categories.map((category) => (
							<div key={category.id} className='border-b last:border-b-0'>
								{/* Category Header */}
								<button
									onClick={() => toggleCategoryExpansion(category.id)}
									disabled={isPending}
									className='w-full flex items-center justify-between py-3 px-4 hover:bg-accent/50 transition-colors disabled:opacity-50'
								>
									<span className='font-medium text-foreground text-sm'>
										{category.name}
									</span>
									<div className='flex items-center gap-2'>
										<span className='text-xs text-muted-foreground'>
											{category.productCount}
										</span>
										{expandedCategories.has(category.id) ? (
											<ChevronDown className='size-4 text-muted-foreground' />
										) : (
											<ChevronRight className='size-4 text-muted-foreground' />
										)}
									</div>
								</button>

								{/* Category Tags */}
								{expandedCategories.has(category.id) &&
									category.tags &&
									category.tags.length > 0 && (
										<div className='px-4 pb-3 space-y-2.5 bg-accent/20'>
											{category.tags.map((tag) => (
												<label
													key={tag.id}
													className='flex items-center justify-between gap-3 cursor-pointer group'
												>
													<div className='flex items-center gap-2.5'>
														<Checkbox
															checked={filters.tags?.includes(tag.slug) || false}
															onCheckedChange={() => handleToggleTag(tag.slug)}
															disabled={isPending}
															className='size-4 rounded-sm border-3 border-grey-700'
														/>
														<span className='text-sm text-foreground group-hover:text-primary transition-colors'>
															{tag.name}
														</span>
													</div>
													<span className='text-xs text-muted-foreground'>
														{tag.productCount}
													</span>
												</label>
											))}
										</div>
									)}
							</div>
						))}
					</div>
				</div>

				{/* Price Range Section */}
				<div>
					<h3 className='text-sm font-semibold mb-4 text-foreground'>Price Range</h3>

					{/* Slider */}
					<div className='px-2 mb-6'>
						<Slider
							min={0}
							max={1000}
							step={10}
							value={[Number(priceRange.min), Number(priceRange.max)]}
							onValueChange={handlePriceRangeChange}
							onValueCommit={handlePriceCommit}
							disabled={isPending}
							className='w-full'
						/>
					</div>

					{/* Price Inputs */}
					<div className='grid grid-cols-2 gap-4'>
						<div>
							<label className='text-xs font-medium text-muted-foreground mb-1.5 block'>
								Min Price
							</label>
							<div className='relative'>
								<span className='absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground'>
									$
								</span>
								<Input
									type='number'
									value={priceRange.min}
									onChange={(e) => handlePriceInputChange('min', e.target.value)}
									onBlur={handlePriceInputBlur}
									disabled={isPending}
									className='pl-7'
									min={0}
									max={priceRange.max}
								/>
							</div>
						</div>
						<div>
							<label className='text-xs font-medium text-muted-foreground mb-1.5 block'>
								Max Price
							</label>
							<div className='relative'>
								<span className='absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground'>
									$
								</span>
								<Input
									type='number'
									value={priceRange.max}
									onChange={(e) => handlePriceInputChange('max', e.target.value)}
									onBlur={handlePriceInputBlur}
									disabled={isPending}
									className='pl-7'
									min={priceRange.min}
									max={1000}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Loading Indicator */}
			{isPending && (
				<div className='mt-6 pt-6 border-t text-center'>
					<div className='inline-flex items-center gap-2 text-sm text-muted-foreground'>
						<div className='size-4 border-2 border-primary border-t-transparent rounded-full animate-spin' />
						<span>Applying filters...</span>
					</div>
				</div>
			)}

			{/* Footer Actions */}
			<div className='py-6 border-t bg-background space-y-3'>
				{/* {hasActiveFilters && (
							<button
								onClick={() => {
									clearFilters();
									onClose();
								}}
								disabled={isPending}
								className='w-full py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground border rounded-lg hover:bg-accent transition-colors disabled:opacity-50'
							>
								Clear All Filters
							</button>
						)} */}
				<button
					// onClick={onClose}
					className='w-full py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors'
				>
					Show Results
				</button>
			</div>
		</div>
	);
};

export default ShopFilter;
