import type React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '@/components/layouts/header';
import { Footer } from '@/components/layouts/footer';
import './globals.css';
import routes from '@/config/routes';
import AuthInitializer from '@/components/providers/AuthInitializer';
import { Toaster } from '@/components/ui/sonner';

const _geist = Geist({ subsets: ['latin'] });
const _geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Oasis - Modern Contemporary Furniture',
	description: 'Discover the artistry of modern contemporary furniture at Oasis',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const navLinks = [
		{ label: 'Home', href: routes.page.home },
		{ label: 'Shop', href: routes.page.shop },
		{ label: 'Categories', href: routes.page.categories.all },
		{ label: 'Blog', href: routes.page.blog },
	];

	return (
		<html lang='en' className={`${_geist.className} ${_geistMono.className}`}>
			{/* <head> */}
			{/* Google tag (gtag.js) */}
			{/* <Script
					async
					src='https://www.googletagmanager.com/gtag/js?id=G-3TZWEEVM2M'
				></Script>
				<Script>
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());

						gtag('config', 'G-3TZWEEVM2M');
  					`}
				</Script> */}
			{/* </head> */}

			<body className={`font-sans antialiased`}>
				<AuthInitializer>
					<Header navLinks={navLinks} />

					<main className='bg-white pt-30 md:pt-20 px-2 sm:px-6 lg:px-12'>
						{children}
					</main>

					<Footer navLinks={navLinks} />
				</AuthInitializer>

				<Toaster richColors />
			</body>
		</html>
	);
}
