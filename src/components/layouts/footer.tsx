'use client';

import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';
import Logo from '../logo';
import { Button } from '../ui/button';

export function Footer({
	navLinks,
}: {
	navLinks: { label: string; href: string }[];
}) {
	return (
		<footer className='mt-20 bg-grey-900 text-slate-50'>
			<div className='px-2 py-20 sm:px-6 lg:px-12'>
				<div className='grid gap-x-20 md:grid-cols-[auto_auto_auto_auto] items-end'>
					<div className='flex flex-col gap-y-15 md:gap-y-30'>
						<Logo secondary />

						<nav className=''>
							<p className='flex flex-wrap max-w-40'>
								{navLinks.map((link, i) => (
									<Fragment key={i}>
										<Link
											href={link.href}
											className='text-sm text-secondary hover:text-slate-200'
										>
											{link.label}
										</Link>
										<span className='mx-2 text-gray-500'>/</span>
									</Fragment>
								))}
							</p>
						</nav>
					</div>

					<div className='flex flex-col gap-y-2 md:gap-y-5'>
						<div className='mt-4 space-y-3'>
							<h4 className='text-xs text-grey-500 uppercase tracking-wide'>
								Contact Us
							</h4>
							<div>
								<p className='text-lg'>+1 999 888-76-54</p>
							</div>
						</div>
						<div className='mt-4 space-y-3'>
							<h4 className='text-xs text-grey-500 uppercase tracking-wide'>Email</h4>
							<div>
								<p className='text-sm'>hello@oasis.com</p>
							</div>
						</div>
					</div>

					<div className='flex flex-col gap-y-2 md:gap-y-5'>
						<div className='mt-4 space-y-3'>
							<h4 className='text-xs text-grey-500 uppercase tracking-wide'>
								Address
							</h4>
							<div>
								<p className='text-sm'>
									2183 Thornridge Dr, Syracuse, Connecticut 28654
								</p>
							</div>
						</div>
						<div className='mt-4 space-y-3'>
							<h4 className='text-xs text-grey-500 uppercase tracking-wide'>
								Opening Hours
							</h4>
							<div>
								<p className='text-lg'>9am—6pm</p>
							</div>
						</div>
					</div>

					<div className='flex flex-col gap-y-15 md:gap-y-35 items-end'>
						<Button
							variant='ghost'
							onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
							className='size-10 rounded-full flex items-center justify-center bg-grey-100'
						>
							<ArrowUp className='text-accent-foreground' />
						</Button>
						<p className='text-xs text-slate-400'>© 2025 - Copyright</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
