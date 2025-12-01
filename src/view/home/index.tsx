import Hero from './hero';
import Category from './category';
import FAQ from './faq';
import { categories, FAQs } from './data';
import Inspiration from './inspiration';
import ProductCatalogue from '@/components/product-catalogue';

type HomeViewProps = {
	products: Product[];
	inspirations: Inspiration[];
};

const HomeView = ({ products, inspirations }: HomeViewProps) => {
	return (
		<>
			<Hero />
			<Category categories={categories} />
			<ProductCatalogue products={products} />
			<Inspiration inspirations={inspirations} />
			<FAQ FAQItem={FAQs} />
		</>
	);
};

export default HomeView;
