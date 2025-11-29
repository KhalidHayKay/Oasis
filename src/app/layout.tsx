import type React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '@/components/layouts/header';
import { Footer } from '@/components/layouts/footer';
import './globals.css';
import routes from '@/config/routes';

const _geist = Geist({ subsets: ['latin'] });
const _geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Oasis - Modern Contemporary Furniture',
	description: 'Discover the artistry of modern contemporary furniture at Oasis',
	generator: 'v0.app',
	icons: {
		icon: [
			{
				url: '/icon-light-32x32.png',
				media: '(prefers-color-scheme: light)',
			},
			{
				url: '/icon-dark-32x32.png',
				media: '(prefers-color-scheme: dark)',
			},
			{
				url: '/icon.svg',
				type: 'image/svg+xml',
			},
		],
		apple: '/apple-icon.png',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const navLinks = [
		{ label: 'Home', href: routes.page.home },
		{ label: 'Shop', href: routes.page.shop },
		{ label: 'Categories', href: routes.page.categories },
		{ label: 'Blog', href: routes.page.blog },
	];

	return (
		<html lang='en'>
			<body className={`font-sans antialiased`}>
				{/* <CHANGE> Added Header component */}
				<Header navLinks={navLinks} />

				{/* Main content */}
				<main className='pt-20 px-2 sm:px-6 lg:px-12'>{children}</main>

				{/* <CHANGE> Added Footer component */}
				<Footer navLinks={navLinks} />
			</body>
		</html>
	);
}
