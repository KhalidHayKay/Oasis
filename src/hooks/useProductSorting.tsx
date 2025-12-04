'use client';

import { useState, useMemo } from 'react';

export type SortOption = 'popular' | 'recent' | 'price-high' | 'price-low';

export function useProductSorting(products: Product[]) {
	const [sortBy, setSortBy] = useState<SortOption>('popular');

	const sortedProducts = useMemo(() => {
		return [...products].sort((a, b) => {
			switch (sortBy) {
				case 'price-low':
					return a.price.amount - b.price.amount;
				case 'price-high':
					return b.price.amount - a.price.amount;
				case 'popular':
					return b.popularity - a.popularity;
				case 'recent':
				default:
					return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
			}
		});
	}, [products, sortBy]);

	return {
		sortBy,
		setSortBy,
		sortedProducts,
	};
}
