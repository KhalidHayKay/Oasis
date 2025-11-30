'use client';

import Product from './product';
import Related from './related';

const ProductView = ({
	data: { product, relatedProducts },
}: {
	data: ProductDetailsResponse;
}) => {
	return (
		<>
			<Product product={product} />
			<Related products={relatedProducts} />
		</>
	);
};

export default ProductView;
