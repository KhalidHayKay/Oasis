import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import routes from '@/config/routes';

export function Header() {
	return (
		<header className='border-b border-grey-200 bg-white'>
			<div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
				{/* Logo */}
				<Link
					href={routes.page.home}
					className='text-2xl font-bold italic text-grey-800'
				>
					Oasis
				</Link>

				{/* Navigation */}
				<nav className='hidden items-center gap-8 md:flex'>
					<Link
						href={routes.page.home}
						className='text-sm font-medium text-grey-700 hover:text-grey-900'
					>
						Home
					</Link>
					<Link
						href={routes.page.shop}
						className='text-sm font-medium text-grey-700 hover:text-grey-900'
					>
						Shop
					</Link>
					<Link
						href={routes.page.categories}
						className='text-sm font-medium text-grey-700 hover:text-grey-900'
					>
						Categories
					</Link>
					<Link
						href={routes.page.blog}
						className='text-sm font-medium text-grey-700 hover:text-grey-900'
					>
						Blog
					</Link>
				</nav>

				{/* Right Actions */}
				<div className='flex items-center gap-4'>
					<button className='relative text-grey-700 hover:text-grey-900'>
						<ShoppingCart className='h-5 w-5' />

						<span className='absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-800 text-xs text-white'>
							2
						</span>
					</button>
					<Button className='rounded-full bg-brand-800 px-6 py-2 text-white hover:bg-brand-700'>
						Get Started →
					</Button>
				</div>
			</div>
		</header>
	);
}
