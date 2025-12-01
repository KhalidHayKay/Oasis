import RelatedProductCatalogue from '@/components/related-product-catalogue';
import Hero from './hero';
import Products from './products';

const CategoryContentView = ({
	content: { category, tags, products, relatedProducts },
}: {
	content: categoryContentResponse;
}) => {
	return (
		<>
			<Hero category={category.name} />
			<Products tags={tags} products={products} />
			<RelatedProductCatalogue products={relatedProducts} />
		</>
	);
};

export default CategoryContentView;
