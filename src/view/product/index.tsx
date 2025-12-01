'use client';

import Product from './product';
import Related from '../../components/related-product-catalogue';
import RelatedProductCatalogue from '../../components/related-product-catalogue';

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
