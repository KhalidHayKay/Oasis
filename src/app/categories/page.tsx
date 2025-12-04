import { categoryService } from '@/services/categoryService';
import CategoriesView from '@/view/categories';

export default async function Page() {
	const categories = await categoryService.all();

	return <CategoriesView categories={categories} />;
}
