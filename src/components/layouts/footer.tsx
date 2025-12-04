import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import Image from 'next/image';
import routes from '@/config/routes';
import { Fragment } from 'react/jsx-runtime';

export function Footer({
	navLinks,
}: {
	navLinks: { label: string; href: string }[];
}) {
	return (
		<footer className='mt-20 bg-grey-900 text-slate-50'>
			<div className='px-10 py-20 sm:px-10 lg:px-20'>
				<div className='grid gap-x-20 md:grid-cols-[auto_auto_auto_auto] items-end'>
					<div className='flex flex-col gap-y-15 md:gap-y-30'>
						<Link
							href={routes.page.home}
							className='text-2xl font-bold italic text-grey-800'
						>
							<Image
								src={'/images/logo.png'}
								alt={'App Logo'}
								width={60}
								height={50}
							/>
						</Link>
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
						<Link
							href={'#'}
							className='size-10 rounded-full flex items-center justify-center bg-grey-100'
						>
							<ArrowUp className='text-accent-foreground' />
						</Link>
						<p className='text-xs text-slate-400'>© 2025 - Copyright</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
