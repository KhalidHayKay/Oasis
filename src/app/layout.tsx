import type React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header } from '@/components/layouts/header';
import { Footer } from '@/components/layouts/footer';
import './globals.css';

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
	return (
		<html lang='en'>
			<body className={`font-sans antialiased`}>
				{/* <CHANGE> Added Header component */}
				<Header />

				{/* Main content */}
				<main className='min-h-screen'>{children}</main>

				{/* <CHANGE> Added Footer component */}
				<Footer />
			</body>
		</html>
	);
}
