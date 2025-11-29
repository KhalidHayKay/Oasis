import Hero from './hero';
import Category from './category';
import Products from './products';
import FAQ from './faq';
import { categories, FAQs } from './data';
import Inspiration from './inspiration';

type HomeViewProps = {
	products: Product[];
	inspirations: Inspiration[];
};

const HomeView = ({ products, inspirations }: HomeViewProps) => {
	return (
		<section className='bg-white'>
			<Hero />
			<Category categories={categories} />
			<Products products={products} />
			<Inspiration inspirations={inspirations} />
			<FAQ FAQItem={FAQs} />
		</section>
	);
};

export default HomeView;
