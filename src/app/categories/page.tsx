import { categoryService } from '@/services/categoryService';
import CategoriesView from '@/view/categories';

export const dynamic = 'force-dynamic';

export default async function Page() {
	const categories = await categoryService.all();

	return <CategoriesView categories={categories} />;
}
