'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTransition, useCallback } from 'react';

export interface FilterState {
	tags?: string[];
	min_price?: string;
	max_price?: string;
	search?: string;
}

export const useShopFilters = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	const getCurrentFilters = useCallback((): FilterState => {
		return {
			tags: searchParams.getAll('tags'),
			min_price: searchParams.get('min_price') || undefined,
			max_price: searchParams.get('max_price') || undefined,
			search: searchParams.get('search') || undefined,
		};
	}, [searchParams]);

	// Update URL with new filters
	const updateFilters = useCallback(
		(updates: Partial<FilterState>) => {
			const params = new URLSearchParams(searchParams.toString());

			Object.entries(updates).forEach(([key, value]) => {
				// Remove param if value is null/undefined/empty
				if (!value || (Array.isArray(value) && value.length === 0)) {
					params.delete(key);
				}
				// Handle arrays (like multiple categories)
				else if (Array.isArray(value)) {
					params.delete(key); // Clear existing first
					value.forEach((v) => params.append(key, v));
				}
				// Handle single values
				else {
					params.set(key, String(value));
				}
			});

			startTransition(() => {
				router.push(`${pathname}?${params.toString()}`, { scroll: false });
			});
		},
		[pathname, router, searchParams],
	);

	// Toggle a category (useful for checkboxes)
	const toggleTag = useCallback(
		(tag: string) => {
			const current = getCurrentFilters().tags || [];
			const updated = current.includes(tag)
				? current.filter((c) => c !== tag)
				: [...current, tag];

			updateFilters({ tags: updated });
		},
		[getCurrentFilters, updateFilters],
	);

	// Update price range
	const updatePriceRange = useCallback(
		(minPrice?: number, maxPrice?: number) => {
			updateFilters({
				min_price: minPrice?.toString(),
				max_price: maxPrice?.toString(),
			});
		},
		[updateFilters],
	);

	// Clear all filters
	const clearFilters = useCallback(() => {
		startTransition(() => {
			router.push(pathname, { scroll: false });
		});
	}, [pathname, router]);

	// Clear specific filter
	const clearFilter = useCallback(
		(filterKey: keyof FilterState) => {
			updateFilters({ [filterKey]: undefined });
		},
		[updateFilters],
	);

	return {
		filters: getCurrentFilters(),
		updateFilters,
		toggleTag,
		updatePriceRange,
		clearFilters,
		clearFilter,
		isPending,
	};
};
