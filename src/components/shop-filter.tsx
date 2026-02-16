import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { Input } from './ui/input';

interface ShopFilterProps {
	categories: Category[];
	onApplyFilters: (filters: {
		tags: string[];
		min_price?: number;
		max_price?: number;
	}) => void;
	onClose?: () => void;
	initialFilters?: {
		tags?: string[];
		min_price?: string;
		max_price?: string;
	};
}

const ShopFilter = ({
	categories,
	onApplyFilters,
	onClose,
	initialFilters,
}: ShopFilterProps) => {
	// Local state for pending filters
	const [selectedTags, setSelectedTags] = useState<string[]>(
		initialFilters?.tags || [],
	);
	const [priceRange, setPriceRange] = useState({
		min: Number(initialFilters?.min_price || 0),
		max: Number(initialFilters?.max_price || 1000),
	});

	// UI state for collapsible categories
	const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
		new Set(categories?.length > 0 ? [categories[0].id] : []),
	);

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
		setSelectedTags((prev) =>
			prev.includes(tagSlug)
				? prev.filter((t) => t !== tagSlug)
				: [...prev, tagSlug],
		);
	};

	const handlePriceRangeChange = (values: number[]) => {
		setPriceRange({
			min: values[0],
			max: values[1],
		});
	};

	const handlePriceInputChange = (type: 'min' | 'max', value: string) => {
		const numValue = Number(value) || 0;
		setPriceRange((prev) => ({ ...prev, [type]: numValue }));
	};

	const handlePriceInputBlur = () => {
		if (priceRange.min > priceRange.max) {
			setPriceRange({ min: priceRange.max, max: priceRange.max });
		}
	};

	const handleApplyFilters = () => {
		onApplyFilters({
			tags: selectedTags,
			min_price: priceRange.min > 0 ? priceRange.min : undefined,
			max_price: priceRange.max < 1000 ? priceRange.max : undefined,
		});
		onClose?.();
	};

	const handleClearAll = () => {
		setSelectedTags([]);
		setPriceRange({ min: 0, max: 1000 });
	};

	const hasActiveFilters =
		selectedTags.length > 0 || priceRange.min !== 0 || priceRange.max !== 1000;

	if (!categories || categories.length === 0) {
		return (
			<div className='w-full bg-white rounded-lg p-6 border border-gray-200'>
				<h2 className='text-lg font-semibold mb-4'>Filter Products</h2>
				<p className='text-sm text-gray-500'>No categories available</p>
			</div>
		);
	}

	return (
		<div className='w-full bg-white rounded-lg border border-gray-200 flex flex-col h-full'>
			{/* Header - Only show on mobile */}
			<div className='flex lg:hidden items-center justify-between p-4 border-b border-gray-200'>
				<h2 className='text-lg font-semibold'>Filter Products</h2>
				<button
					onClick={onClose}
					className='p-1 hover:bg-gray-100 rounded-md transition-colors'
				>
					<X className='size-5' />
				</button>
			</div>

			{/* Desktop Header */}
			<div className='hidden lg:flex items-center justify-between p-6 border-b border-gray-200'>
				<h2 className='text-lg font-semibold'>Filter Products</h2>
				{hasActiveFilters && (
					<button
						onClick={handleClearAll}
						className='text-sm text-gray-600 hover:text-gray-900'
					>
						Clear all
					</button>
				)}
			</div>

			{/* Scrollable Content */}
			<div className='flex-1 overflow-y-auto'>
				<div className='p-6 space-y-6'>
					{/* Categories Section */}
					<div>
						<h3 className='text-sm font-medium mb-3 text-gray-900'>Category</h3>
						<div className='space-y-1'>
							{categories.map((category) => (
								<div key={category.id}>
									{/* Category Header */}
									<button
										onClick={() => toggleCategoryExpansion(category.id)}
										className='w-full flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-md transition-colors'
									>
										<div className='flex items-center gap-2'>
											{expandedCategories.has(category.id) ? (
												<ChevronDown className='size-4 text-gray-500' />
											) : (
												<ChevronRight className='size-4 text-gray-500' />
											)}
											<span className='text-sm font-medium text-gray-900'>
												{category.name}
											</span>
										</div>
										<span className='text-xs text-gray-500'>{category.productCount}</span>
									</button>

									{/* Category Tags */}
									{expandedCategories.has(category.id) &&
										category.tags &&
										category.tags.length > 0 && (
											<div className='ml-6 mt-1 space-y-2'>
												{category.tags.map((tag) => (
													<label
														key={tag.id}
														className='flex items-center justify-between gap-2 cursor-pointer group py-1.5 px-2 rounded-md hover:bg-gray-50'
													>
														<div className='flex items-center gap-2'>
															<Checkbox
																checked={selectedTags.includes(tag.slug)}
																onCheckedChange={() => handleToggleTag(tag.slug)}
																className='border-gray-300'
															/>
															<span className='text-sm text-gray-700 group-hover:text-gray-900'>
																{tag.name}
															</span>
														</div>
														<span className='text-xs text-gray-500'>{tag.productCount}</span>
													</label>
												))}
											</div>
										)}
								</div>
							))}
						</div>
					</div>

					{/* Price Range Section */}
					<div className='pt-4 border-t border-gray-200'>
						<h3 className='text-sm font-medium mb-4 text-gray-900'>Price</h3>

						{/* Slider */}
						<div className='px-2 mb-6'>
							<Slider
								min={0}
								max={1000}
								step={10}
								value={[priceRange.min, priceRange.max]}
								onValueChange={handlePriceRangeChange}
								className='w-full'
							/>
						</div>

						{/* Price Inputs */}
						<div className='grid grid-cols-2 gap-3'>
							<div>
								<label className='text-xs text-gray-600 mb-1.5 block'>From</label>
								<div className='relative'>
									<span className='absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500'>
										$
									</span>
									<Input
										type='number'
										value={priceRange.min}
										onChange={(e) => handlePriceInputChange('min', e.target.value)}
										onBlur={handlePriceInputBlur}
										className='pl-7 h-10 border-gray-300'
										min={0}
										max={priceRange.max}
									/>
								</div>
							</div>
							<div>
								<label className='text-xs text-gray-600 mb-1.5 block'>To</label>
								<div className='relative'>
									<span className='absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500'>
										$
									</span>
									<Input
										type='number'
										value={priceRange.max}
										onChange={(e) => handlePriceInputChange('max', e.target.value)}
										onBlur={handlePriceInputBlur}
										className='pl-7 h-10 border-gray-300'
										min={priceRange.min}
										max={1000}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Active Filters Summary */}
					{hasActiveFilters && (
						<div className='pt-4 border-t border-gray-200'>
							<div className='flex items-center justify-between mb-3'>
								<h3 className='text-sm font-medium text-gray-900'>
									Active Filters ({selectedTags.length})
								</h3>
								<button
									onClick={handleClearAll}
									className='text-xs text-gray-600 hover:text-gray-900'
								>
									Clear
								</button>
							</div>
							<div className='flex flex-wrap gap-2'>
								{selectedTags.map((tagSlug) => {
									const tag = categories
										.flatMap((c) => c.tags || [])
										.find((t) => t.slug === tagSlug);
									return tag ? (
										<span
											key={tagSlug}
											className='inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full'
										>
											{tag.name}
											<button
												onClick={() => handleToggleTag(tagSlug)}
												className='hover:bg-gray-200 rounded-full p-0.5'
											>
												<X className='size-3' />
											</button>
										</span>
									) : null;
								})}
								{(priceRange.min !== 0 || priceRange.max !== 1000) && (
									<span className='inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full'>
										${priceRange.min} - ${priceRange.max}
									</span>
								)}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Footer - Apply Button */}
			<div className='p-4 border-t border-gray-200 bg-white'>
				<button
					onClick={handleApplyFilters}
					className='w-full py-2.5 text-sm font-medium bg-black text-white rounded-md hover:bg-gray-800 transition-colors'
				>
					Apply Filters
					{selectedTags.length > 0 && (
						<span className='ml-2 px-1.5 py-0.5 bg-white/20 rounded text-xs'>
							{selectedTags.length}
						</span>
					)}
				</button>
			</div>
		</div>
	);
};

export default ShopFilter;
