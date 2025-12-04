import { categoryService } from '@/services/categoryService';
import { productService } from '@/services/productService';
import ShopView from '@/view/shop';

interface PageProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page(props: PageProps) {
	const searchParams = await props.searchParams;

	const [productData, tags, popularCategories] = await Promise.all([
		productService.all(searchParams),
		categoryService.tags(),
		categoryService.all('sort_by=popularity&max=5'),
	]);

	return (
		<ShopView
			products={productData}
			tags={tags}
			popularCategories={popularCategories}
		/>
	);
}
