'use client';

import { sortType } from '@/components/product/product-catalogue';
import { useEffect, useState, useCallback } from 'react';

export function useTopProducts(products: Product[]) {
	const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
	const [sortBy, setSortBy] = useState<sortType>('recent');

	const displaySize = 20;

	const sortProducts = useCallback((list: Product[], criterion: string) => {
		const sorted = [...list];

		switch (criterion) {
			case 'price-low':
				sorted.sort((a, b) => a.price.amount - b.price.amount);
				break;
			case 'price-high':
				sorted.sort((a, b) => b.price.amount - a.price.amount);
				break;
			case 'popular':
				sorted.sort((a, b) => b.popularity - a.popularity);
				break;
			case 'recent':
			default:
				sorted.sort(
					(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
		}

		return sorted;
	}, []);

	const handleShowMore = () => {
		setDisplayedProducts((prev) => {
			const nextCount = Math.min(prev.length + displaySize, products.length);
			const sorted = sortProducts(products, sortBy);
			return sorted.slice(0, nextCount);
		});
	};

	const handleCollapse = () => {
		const sorted = sortProducts(products, sortBy);
		setDisplayedProducts(sorted.slice(0, displaySize));
	};

	const hasMore = displayedProducts.length < products.length;

	useEffect(() => {
		const sorted = sortProducts(products, sortBy);

		queueMicrotask(() => {
			setDisplayedProducts(
				sorted.slice(0, Math.max(displayedProducts.length, displaySize))
			);
		});
	}, [sortBy, products, sortProducts, displayedProducts.length]);

	return {
		displayedProducts,
		sortBy,
		setSortBy,
		handleShowMore,
		hasMore,
		handleCollapse,
	};
}
