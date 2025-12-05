import HomeView from '@/view/home';
import { productService } from '@/services/productService';
import { inspirationService } from '@/services/inspirationService';

export const dynamic = 'force-dynamic';

export default async function Page() {
	const [products, inspo] = await Promise.all([
		productService.top(),
		inspirationService.all(),
	]);

	return <HomeView products={products} inspirations={inspo} />;
}
