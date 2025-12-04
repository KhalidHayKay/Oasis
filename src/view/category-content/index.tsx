import RelatedProductCatalogue from '@/components/product/related-product-catalogue';
import Hero from './hero';
import Products from './products';

const CategoryContentView = ({
	content: { category, tags, products, relatedProducts },
}: {
	content: CategoryContentResponse;
}) => {
	return (
		<>
			<Hero category={category.name} desc={category.description} />
			<Products tags={tags} products={products} />
			<RelatedProductCatalogue products={relatedProducts} />
		</>
	);
};

export default CategoryContentView;
