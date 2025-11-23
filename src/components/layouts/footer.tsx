import Link from 'next/link';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export function Footer() {
	return (
		<footer className='bg-slate-950 text-slate-50'>
			<div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
				<div className='grid gap-8 md:grid-cols-4'>
					{/* Brand */}
					<div>
						<h3 className='text-xl font-bold italic'>Oasis</h3>
						<nav className='mt-4 flex flex-col gap-2'>
							<Link href='#' className='text-sm text-slate-300 hover:text-slate-50'>
								Home
							</Link>
							<Link href='#' className='text-sm text-slate-300 hover:text-slate-50'>
								Shop
							</Link>
							<Link href='#' className='text-sm text-slate-300 hover:text-slate-50'>
								About Us
							</Link>
						</nav>
					</div>

					{/* Contact */}
					<div>
						<h4 className='text-sm font-semibold uppercase tracking-wide'>
							Contact Us
						</h4>
						<div className='mt-4 space-y-3'>
							<div className='flex items-start gap-3'>
								<Phone className='mt-0.5 h-4 w-4 shrink-0 text-slate-400' />
								<div>
									<p className='text-sm'>+1 999 888-76-54</p>
								</div>
							</div>
							<div className='flex items-start gap-3'>
								<Mail className='mt-0.5 h-4 w-4 shrink-0 text-slate-400' />
								<div>
									<p className='text-sm'>hello@oasis.com</p>
								</div>
							</div>
						</div>
					</div>

					{/* Address */}
					<div>
						<h4 className='text-sm font-semibold uppercase tracking-wide'>Address</h4>
						<div className='mt-4 flex items-start gap-3'>
							<MapPin className='mt-0.5 h-4 w-4 shrink-0 text-slate-400' />
							<div>
								<p className='text-sm'>
									2183 Thornridge Dr, Syracuse, Connecticut 28654
								</p>
							</div>
						</div>
					</div>

					{/* Hours */}
					<div>
						<h4 className='text-sm font-semibold uppercase tracking-wide'>
							Opening Hours
						</h4>
						<div className='mt-4 flex items-start gap-3'>
							<Clock className='mt-0.5 h-4 w-4 shrink-0 text-slate-400' />
							<div>
								<p className='text-sm'>9am—6pm</p>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom */}
				<div className='mt-8 border-t border-slate-800 pt-8'>
					<div className='flex flex-col items-center justify-between md:flex-row'>
						<p className='text-sm text-slate-400'>© 2025 - Copyright</p>
						<div className='mt-4 flex gap-6 md:mt-0'>
							<Link href='#' className='text-sm text-slate-400 hover:text-slate-50'>
								Privacy
							</Link>
							<Link href='#' className='text-sm text-slate-400 hover:text-slate-50'>
								Terms
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
