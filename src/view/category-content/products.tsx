'use client';

import HorizontalScrollablePill from '@/components/horizontal-scrollable-pills';
import ProductCatalogue from '@/components/product/product-catalogue';
import { SetStateAction, useState } from 'react';

interface ProductProps {
	tags: Tag[];
	products: Product[];
}

const Products = ({ tags, products }: ProductProps) => {
	const [activeTag, setActiveTag] = useState('All');

	const tagFilters = ['All', ...tags.map((t) => t.name)];

	// Filter inspirations by category
	const filteredProducts =
		activeTag === 'All'
			? products
			: products.filter((item) => item.tags.includes(activeTag));

	return (
		<section className='spacing-section'>
			<HorizontalScrollablePill
				categories={tagFilters}
				active={{
					set: setActiveTag,
					value: activeTag,
				}}
			/>
			<ProductCatalogue className='pt-5!' products={filteredProducts} />
		</section>
	);
};

export default Products;
