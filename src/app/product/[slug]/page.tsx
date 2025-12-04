import { productService } from '@/services/productService';
import ProductView from '@/view/product';

interface PageProps {
	params: {
		slug: string;
	};
}

const product = async (params: PageProps) => {
	const { slug } = params.params;

	const data = await productService.details(slug);

	return <ProductView data={data} />;
};

export default product;
