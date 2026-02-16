import Link from 'next/link';
import { Home, Sofa } from 'lucide-react';

export default function NotFound() {
	return (
		<div className='pt-10'>
			{/* Decorative background elements */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse' />
				<div className='absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse [animation-delay:1s]' />
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl' />
			</div>

			<div className='relative max-w-4xl mx-auto text-center'>
				{/* 404 Number with furniture icon */}
				<div className='relative inline-block mb-8'>
					<h1 className='text-[180px] sm:text-[220px] lg:text-[280px] font-bold text-foreground/5 leading-none select-none'>
						404
					</h1>
					<div className='absolute inset-0 flex items-center justify-center'>
						<div className='relative'>
							<div className='absolute inset-0 bg-accent/10 rounded-full blur-2xl animate-pulse' />
							<Sofa
								className='size-20 sm:size-24 lg:size-28 text-foreground/15 relative'
								strokeWidth={1.5}
							/>
						</div>
					</div>
				</div>

				{/* Main content */}
				<div className='space-y-4 mb-10'>
					<div className='inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-2'>
						<span className='relative flex h-2 w-2'>
							<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive/75'></span>
							<span className='relative inline-flex rounded-full h-2 w-2 bg-destructive'></span>
						</span>
						Page Not Found
					</div>

					<h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4'>
						Oops! This page doesn&apos;t exist
					</h2>

					<p className='text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto'>
						Looks like this page has been moved or doesn&apos;t exist. But don&apos;t
						worry, we have plenty of beautiful furniture waiting for you!
					</p>
				</div>

				{/* Action buttons */}
				<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'>
					<Link href='/' className='w-full sm:w-auto'>
						<button className='group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-800 text-primary-foreground font-medium rounded-lg hover:bg-brand-700 transition-all hover:gap-3'>
							<Home className='size-5' />
							Back to Home
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
