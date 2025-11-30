import Crumb from './crumb';
import Imagery from './imagery';
import Detail from './detail';

const Product = ({ product }: { product: ProductDetails }) => {
	const { name, featuredImage, images, category } = product;

	const mergedImages = [
		featuredImage,
		...images.filter((image) => image !== featuredImage),
	];

	return (
		<section className='spacing-section'>
			<Crumb category={category} name={name} />

			<div className='flex flex-col lg:flex-row gap-8'>
				<Imagery images={mergedImages} />

				<Detail product={product} />
			</div>
		</section>
	);
};

export default Product;
