import Crumb from '../../components/crumb';
import Imagery from './imagery';
import Detail from './detail';
import routes from '@/config/routes';

const Product = ({ product }: { product: ProductDetails }) => {
	const { name, featuredImage, images, category } = product;

	const mergedImages = [
		featuredImage,
		...images.filter((image) => image !== featuredImage),
	];

	const links = [
		{
			href: routes.page.home,
			title: 'Home',
		},
		{
			href: routes.page.categories.all,
			title: 'Categories',
		},
		{
			href: routes.page.categories.view(category),
			title: category,
		},
	];

	return (
		<section className='spacing-section'>
			<Crumb links={links} page={name} />

			<div className='flex flex-col lg:flex-row gap-8'>
				<Imagery images={mergedImages} />

				<Detail product={product} />
			</div>
		</section>
	);
};

export default Product;
