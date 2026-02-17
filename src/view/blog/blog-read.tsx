'use client';

import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import routes from '@/config/routes';

interface BlogReadViewProps {
	blog: BlogDetail | null;
}

const BlogReadView = ({ blog }: BlogReadViewProps) => {
	if (!blog) {
		return (
			<main className='min-h-screen bg-background flex items-center justify-center'>
				<div className='text-center space-y-4'>
					<h1 className='text-2xl sm:text-3xl font-semibold text-foreground'>
						Blog not found
					</h1>
					<p className='text-muted-foreground'>
						The article you&apos;re looking for doesn&apos;t exist.
					</p>
					<Link href={routes.page.blog}>
						<Button className='gap-2'>
							<ArrowLeft className='w-4 h-4' />
							Back to Blog
						</Button>
					</Link>
				</div>
			</main>
		);
	}

	// Parse body content into paragraphs
	const paragraphs = blog.body.split('\n\n').filter((p) => p.trim());

	return (
		<>
			{/* Header Navigation */}
			<header className='py-4 border-b border-border'>
				<div className='max-w-5xl mx-auto'>
					<Link href={routes.page.blog}>
						<Button
							variant='ghost'
							className='gap-2 text-muted-foreground hover:text-foreground pl-0'
						>
							<ArrowLeft className='w-4 h-4' />
							Back to Blog
						</Button>
					</Link>
				</div>
			</header>

			{/* Article Content */}
			<article className='py-8 sm:py-12 md:py-16'>
				<div className='max-w-5xl mx-auto space-y-8'>
					{/* Article Header */}
					<div className='space-y-6'>
						{/* Title */}
						<h1 className='text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground leading-tight text-balance'>
							{blog.title}
						</h1>

						{/* Description */}
						<div className='space-y-4'>
							<p className='text-lg sm:text-xl text-muted-foreground leading-relaxed'>
								{blog.description}
							</p>
						</div>

						{/* Meta Information */}
						<div className='flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground border-t border-b border-border pt-4 pb-4'>
							<div className='flex items-center gap-2'>
								<Calendar className='w-4 h-4' />
								{new Date(blog.createdAt).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</div>

							{/* Tags */}
							<div className='flex flex-wrap gap-2'>
								{blog.hashtags.map((tag) => (
									<span
										key={tag}
										className='inline-flex items-center gap-1 text-xs font-medium bg-secondary px-2.5 py-1 rounded-full'
									>
										<Tag className='w-3 h-3' />
										{tag}
									</span>
								))}
							</div>
						</div>
					</div>

					{/* Featured Image */}
					<div className='relative w-full aspect-video overflow-hidden rounded-lg'>
						<Image
							src={blog.coverImage}
							alt={blog.title}
							fill
							className='object-cover'
							priority
						/>
					</div>

					{/* Body Content */}
					<div className='prose prose-sm sm:prose-base max-w-none text-foreground space-y-6'>
						{paragraphs.map((paragraph, index) => (
							<p
								key={index}
								className='text-base sm:text-lg leading-relaxed text-muted-foreground'
							>
								{paragraph}
							</p>
						))}
					</div>

					{/* Footer CTA */}
					<div className='pt-8 border-t border-border'>
						<Link href={routes.page.blog}>
							<Button variant='outline' className='gap-2'>
								<ArrowLeft className='w-4 h-4' />
								Back to Blog
							</Button>
						</Link>
					</div>
				</div>
			</article>
		</>
	);
};

export default BlogReadView;
