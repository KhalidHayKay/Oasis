import { categoryService } from '@/services/categoryService';
import CategoryContentView from '@/view/category-content';

export default async function Page({ params }: { params: { slug: string } }) {
	const { slug } = await params;
	const content = await categoryService.content(slug);

	return <CategoryContentView content={content} />;
}
