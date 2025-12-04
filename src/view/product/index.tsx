'use client';

import Product from './product';
import RelatedProductCatalogue from '@/components/product/related-product-catalogue';

const ProductView = ({
	data: { product, relatedProducts },
}: {
	data: ProductDetailsResponse;
}) => {
	return (
		<>
			<Product product={product} />
			<RelatedProductCatalogue products={relatedProducts} />
		</>
	);
};

export default ProductView;
