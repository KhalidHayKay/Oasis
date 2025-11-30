import { productService } from '@/services/productService';
import ProductView from '@/view/product';

const product = async ({ params }: { params: Promise<any> }) => {
	const { slug } = await params;
	const data = await productService.details(slug);

	return <ProductView data={data} />;
};

export default product;
