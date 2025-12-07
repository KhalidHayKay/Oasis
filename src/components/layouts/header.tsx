'use client';

import Link from 'next/link';
import { Bell, ShoppingBag, Sofa } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import AppUser from './app-user';

export function Header({
	navLinks,
}: {
	navLinks: { label: string; href: string }[];
}) {
	const pathname = usePathname();

	const [scrollDepth, setScrollDepth] = useState(0);

	const isLoggedIn = false;
	const user = {
		name: 'John Doe',
		email: 'john@example.com',
		avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
	};

	const activeNav =
		navLinks.find((link) => pathname === link.href)?.label ||
		navLinks[0]?.label ||
		'home';

	const handleWindowScroll = () => {
		setScrollDepth(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleWindowScroll);

		return () => {
			window.removeEventListener('scroll', handleWindowScroll);
		};
	}, []);

	return (
		<header
			className={cn(
				'fixed top-0 z-50 w-full bg-white transition-all duration-200',
				scrollDepth >= 80 ? 'border-b border-grey-100 shadow-sm' : ''
			)}
		>
			<div className='px-2 sm:px-6 lg:px-12'>
				<div className='flex items-center justify-between h-16 lg:h-20'>
					{/* Logo */}
					<div className='flex items-center gap-2 text-grey-800'>
						<Sofa className='w-5 h-5 lg:w-6 lg:h-6' />
						<h1 className='text-lg lg:text-xl font-semibold'>Oasis</h1>
					</div>

					{/* Navigation - Hidden on mobile, shown on md+ */}
					<nav className='hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2'>
						{navLinks.map((link, i) => (
							<Link
								key={i}
								href={link.href}
								className={cn(
									'text-sm font-medium transition-colors hover:text-grey-900 relative',
									activeNav.toLowerCase() === link.label.toLowerCase()
										? 'text-grey-900'
										: 'text-grey-500'
								)}
							>
								{link.label.toUpperCase()}
								{activeNav.toLowerCase() === link.label.toLowerCase() && (
									<span className='absolute -bottom-1 left-0 right-0 h-0.5 bg-grey-900' />
								)}
							</Link>
						))}
					</nav>

					{/* Right side actions */}
					<div className='flex items-center gap-3 lg:gap-4'>
						{isLoggedIn && (
							<button className='relative p-2 hover:bg-grey-50 rounded-lg transition-colors'>
								<Bell className='w-5 h-5 text-grey-700' />
								<span className='absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white'></span>
							</button>
						)}

						<Button
							variant='outline'
							size='sm'
							className='gap-2 rounded-full border-grey-300 text-grey-700 hover:bg-grey-50 hover:text-grey-900 hover:border-grey-400'
						>
							<span className='hidden sm:inline text-xs font-medium tracking-wide'>
								MY CART
							</span>
							<ShoppingBag className='w-4 h-4' />
						</Button>

						<AppUser isLoggedIn={isLoggedIn} user={user} />
					</div>
				</div>

				{/* Mobile navigation */}
				<nav className='md:hidden flex items-center gap-6 pb-3 border-t border-grey-100 pt-3'>
					{navLinks.map((link, i) => (
						<Link
							key={i}
							href={link.href}
							className={cn(
								'text-sm font-medium transition-colors relative',
								activeNav.toLowerCase() === link.label.toLowerCase()
									? 'text-grey-900'
									: 'text-grey-500'
							)}
						>
							{link.label.toUpperCase()}
							{activeNav.toLowerCase() === link.label.toLowerCase() && (
								<span className='absolute -bottom-3 left-0 right-0 h-0.5 bg-grey-900' />
							)}
						</Link>
					))}
				</nav>
			</div>
		</header>
	);
}
