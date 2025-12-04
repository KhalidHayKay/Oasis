'use client';

import Link from 'next/link';
import { ArrowRight, Menu, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import routes from '@/config/routes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import AppButton from '../app-button';

export function Header({
	navLinks,
}: {
	navLinks: { label: string; href: string }[];
}) {
	// const [toggle, showMenu] = useState(false);
	const [scrollDepth, setScrollDepth] = useState(0);
	// const [activeNav, setActiveNav] = useState('home');

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
				'fixed top-0 left-0 z-50 w-full bg-white',
				scrollDepth >= 80 ? 'border-b border-grey-100 transition-colors' : ''
			)}
		>
			<div className='flex items-center justify-between p-2 sm:px-6 sm:py-4 lg:px-12 lg:py-5'>
				<Link
					href={routes.page.home}
					className='text-2xl font-bold italic text-grey-800'
				>
					<Image src={'/images/logo.png'} alt={'App Logo'} width={60} height={50} />
				</Link>

				<nav className='hidden items-center gap-8 lg:flex'>
					{navLinks.map((link, i) => (
						<Link
							key={i}
							href={link.href}
							className='text-sm font-medium text-grey-700 hover:text-grey-900'
						>
							{link.label}
						</Link>
					))}
				</nav>

				<div className='flex items-center gap-4'>
					<button className='relative size-7 sm:size-10 rounded-full flex items-center justify-center bg-brand-50 text-grey-700 hover:bg-brand-100 transition-colors cursor-pointer'>
						<ShoppingCart className='size-3.5 sm:size-5' />

						<span className='absolute -right-0.5 sm:-right-1 top-0 flex size-2.5 sm:size-4 items-center justify-center rounded-full bg-brandRed text-[10px] sm:text-xs text-white'>
							2
						</span>
					</button>
					<AppButton>
						Get Started <ArrowRight className='h-4 w-4' />
					</AppButton>
					<Button
						variant='outline'
						className='size-7 sm:size-10 cursor-pointer lg:hidden'
					>
						<Menu className='size-4' />
					</Button>
				</div>
			</div>
		</header>
	);
}
