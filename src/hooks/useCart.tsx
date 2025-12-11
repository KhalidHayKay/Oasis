'use client';

import { useEffect, useState } from 'react';

export function useCart() {
	const [cartProducts, setCartProducts] = useState<Product[]>([]);
	const isLoggedIn = false;

	const add = (product: Product) => {
		setCartProducts((prev) => [product, ...prev]);
	};

	return {
		add,
		items: cartProducts,
	};
}
