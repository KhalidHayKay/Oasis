'use client';

import { useState } from 'react';

export function useCart() {
	const [cartProducts, setCartProducts] = useState<Product[]>([]);

	const add = (product: Product) => {
		setCartProducts((prev) => [product, ...prev]);
	};

	return {
		add,
		items: cartProducts,
	};
}
