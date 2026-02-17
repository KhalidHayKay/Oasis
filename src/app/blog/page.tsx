import { blogService } from '@/services/blogService';
import BlogView from '@/view/blog';

export const dynamic = 'force-dynamic';

export default async function Page() {
	const data = await blogService.all(7);

	return <BlogView initialBlogs={data.data} initialLinks={data.links} />;
}
