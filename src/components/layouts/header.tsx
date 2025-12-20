'use client';

import Link from 'next/link';
import { Bell, ShoppingBag, Sofa } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import AppUser from './app-user';
import { useAuthStore } from '@/store/useAuthStore';
import { Skeleton } from '../ui/skeleton';
import Logo from '../logo';

export function Header({
	navLinks,
}: {
	navLinks: { label: string; href: string }[];
}) {
	const pathname = usePathname();

	const [scrollDepth, setScrollDepth] = useState(0);

	const isInitiatingAuth = useAuthStore((store) => store.isInitiatingAuth);
	const user = useAuthStore((store) => store.user);
	const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

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
			inert={false}
			className={cn(
				'fixed top-0 z-50 w-full bg-white transition-all duration-200',
				scrollDepth >= 80 ? 'border-b border-grey-100 shadow-sm' : ''
			)}
		>
			<div className='px-2 sm:px-6 lg:px-12'>
				<div className='flex items-center justify-between h-16 lg:h-20'>
					<Logo />

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

						{isInitiatingAuth ? (
							<Skeleton className='w-8 h-8 rounded-full bg-brand-100' />
						) : (
							<AppUser isAuthenticated={isAuthenticated} user={user} />
						)}
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
