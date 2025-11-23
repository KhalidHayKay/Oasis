import Hero from './hero';
import Category from './category';

const HomeView = ({ categories }: { categories: any }) => {
	return (
		<section className='bg-white'>
			<Hero />
			<Category data={categories} />
		</section>
	);
};

export default HomeView;
