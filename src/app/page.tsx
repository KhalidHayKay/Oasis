import HomeView from '@/view/home';
import { productService } from '@/services/productService';
import { inspirationService } from '@/services/inspirationService';

export default async function Page() {
	const [products, inspo] = await Promise.all([
		productService.top(),
		inspirationService.all(),
	]);

	return <HomeView products={products} inspirations={inspo} />;
}
