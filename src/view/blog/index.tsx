'use client';

import { useState, useCallback } from 'react';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { blogService } from '@/services/blogService';

interface BlogViewProps {
	initialBlogs: Blog[];
	initialLinks: PaginationLinks;
}

export default function BlogView({
	initialBlogs,
	initialLinks,
}: BlogViewProps) {
	const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
	const [links, setLinks] = useState(initialLinks);
	const [isLoading, setIsLoading] = useState(false);

	const handleLoadMore = useCallback(async () => {
		if (!links.next || isLoading) return;

		setIsLoading(true);
		try {
			const response = await blogService.next(links.next);
			if (response) {
				setBlogs((prev) => [...prev, ...response.data]);
				setLinks(response.links);
			}
		} catch (error) {
			console.error('Error loading more blogs:', error);
		} finally {
			setIsLoading(false);
		}
	}, [links.next, isLoading]);

	const featuredBlog = blogs[0];
	const gridBlogs = blogs.slice(1);

	return (
		<>
			{/* Featured Post Section */}
			{featuredBlog && (
				<section className='py-8 sm:py-12 md:py-16'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center'>
						{/* Featured Image */}
						<div className='relative aspect-video md:aspect-square overflow-hidden rounded-lg'>
							<Image
								src={featuredBlog.coverImage}
								alt={featuredBlog.title}
								fill
								className='object-cover'
								priority
							/>
						</div>

						{/* Featured Content */}
						<div className='flex flex-col justify-center space-y-4'>
							<h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground leading-tight text-balance'>
								{featuredBlog.title}
							</h1>

							<p className='text-base sm:text-lg text-muted-foreground leading-relaxed'>
								{featuredBlog.description}
							</p>

							{/* Tags */}
							<div className='flex flex-wrap gap-2'>
								{featuredBlog.hashtags.slice(0, 2).map((tag) => (
									<span
										key={tag}
										className='inline-flex items-center gap-1 text-sm font-medium text-muted-foreground'
									>
										<Tag className='w-3.5 h-3.5' />
										{tag}
									</span>
								))}
							</div>

							{/* Meta Info */}
							<div className='flex items-center gap-4 text-sm text-muted-foreground pt-2'>
								<div className='flex items-center gap-2'>
									<Calendar className='w-4 h-4' />
									{new Date(featuredBlog.createdAt).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</div>
							</div>

							{/* CTA Button */}
							<div className='pt-2'>
								<Link href={`/blog/${featuredBlog.slug}`}>
									<Button className='w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 text-primary-foreground'>
										Read article
										<ArrowRight className='w-4 h-4' />
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</section>
			)}

			{/* Latest Articles Section */}
			<section className='pt-5 sm:pt-8 md:pt-10'>
				<h2 className='text-2xl sm:text-4xl font-semibold text-foreground mb-8 md:mb-12'>
					Latest Articles
				</h2>

				{/* Blog Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mb-12'>
					{gridBlogs.map((blog) => (
						<Link key={blog.id} href={`/blog/${blog.slug}`}>
							<article className='group cursor-pointer flex flex-col h-full'>
								{/* Card Image */}
								<div className='relative aspect-video overflow-hidden rounded-lg bg-secondary mb-4 transition-transform duration-300 group-hover:scale-105'>
									<Image
										src={blog.coverImage}
										alt={blog.title}
										fill
										className='object-cover'
									/>
								</div>

								{/* Card Content */}
								<div className='flex flex-col grow space-y-3'>
									{/* Title */}
									<h3 className='text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2'>
										{blog.title}
									</h3>

									{/* Description */}
									<p className='text-sm sm:text-base text-muted-foreground line-clamp-2 grow'>
										{blog.description}
									</p>

									{/* Tags */}
									<div className='flex flex-wrap gap-2 pt-2'>
										{blog.hashtags.slice(0, 2).map((tag) => (
											<span
												key={tag}
												className='text-xs font-medium text-brand-800 bg-brand-50 px-2.5 py-1 rounded-full'
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							</article>
						</Link>
					))}
				</div>

				{/* Load More Button */}
				{links.next && (
					<div className='flex justify-center'>
						<Button
							onClick={handleLoadMore}
							disabled={isLoading}
							variant='outline'
							className='w-full sm:w-auto py-7 px-5 rounded-full'
						>
							{isLoading ? 'Loading...' : 'Load more articles'}
						</Button>
					</div>
				)}
			</section>
		</>
	);
}
