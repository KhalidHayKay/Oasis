import { blogService } from '@/services/blogService';
import BlogReadView from '@/view/blog/blog-read';

export default async function Page({ params }: { params: { slug: string } }) {
	const { slug } = await params;

	const blog = await blogService.content(slug);

	return <BlogReadView blog={blog || null} />;
}
