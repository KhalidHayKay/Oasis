import { Calendar, ChevronRight, ShoppingBag } from 'lucide-react';
import StatusBadge from './status';
import { FormatCurrency, FormatDate } from './format';
import Link from 'next/link';
import routes from '@/config/routes';
import Image from 'next/image';

const OrdersView = ({ orders }: { orders: OrderPreview[] }) => {
	if (orders.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-500'>
				<div className='size-20 bg-grey-50 rounded-full flex items-center justify-center mb-6'>
					<ShoppingBag className='size-10 text-grey-400' />
				</div>
				<h2 className='text-2xl font-semibold text-foreground mb-2'>
					No orders yet
				</h2>
				<p className='text-grey-600 mb-8 max-w-[280px]'>
					Looks like you haven&apos;t made any purchases. Why not explore our latest
					collection?
				</p>
				<Link
					href={routes.page.shop}
					className='inline-flex items-center justify-center bg-brand-800 text-white px-8 py-3 rounded-xl font-medium hover:bg-brand-900 transition-all active:scale-95'
				>
					Go to Shop
				</Link>
			</div>
		);
	}

	return (
		<div className='space-y-8 animate-in fade-in duration-500'>
			<div className='flex flex-col gap-2'>
				<h1 className='heading-section'>My Orders</h1>
				<p className='text-grey-600'>Manage and track your recent purchases.</p>
			</div>

			<div className='space-y-4'>
				{orders.map((order) => (
					<Link
						key={order.id}
						href={routes.page.orders.detail(order.id)}
						className='block group border border-border bg-card hover:border-brand-300 rounded-xl p-5 transition-all duration-200 hover:shadow-sm cursor-pointer'
					>
						<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
							{/* Left: Info */}
							<div className='space-y-1'>
								<div className='flex items-center gap-3'>
									<span className='font-semibold text-foreground'>
										{order.orderNumber}
									</span>
									<StatusBadge status={order.status} />
								</div>
								<div className='flex items-center gap-2 text-sm text-grey-500'>
									<Calendar className='size-3.5' />
									<FormatDate date={order.createdAt} />
									<span className='text-grey-300'>•</span>
									<span>{order.itemsLength} items</span>
								</div>
							</div>

							{/* Middle: Preview Images (Desktop only mostly) */}
							<div className='hidden md:flex items-center gap-[-8px]'>
								{order.productImages.map((item, i) => (
									<div
										key={i}
										className='size-10 rounded-full border-2 border-white bg-muted overflow-hidden relative -ml-3 first:ml-0 z-0'
									>
										<Image
											src={item.src}
											alt={item.alt}
											fill
											className='size-full object-cover'
										/>
									</div>
								))}
								{order.itemsLength > 3 && (
									<div className='size-10 rounded-full border-2 border-white bg-grey-100 flex items-center justify-center text-xs font-medium text-grey-600 -ml-3 z-10'>
										+{order.itemsLength - 3}
									</div>
								)}
							</div>

							{/* Right: Price & Action */}
							<div className='flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-border'>
								<span className='font-semibold text-lg text-foreground'>
									<FormatCurrency value={order.total} />
								</span>
								<div className='text-brand-800 font-medium text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform'>
									View Details <ChevronRight className='size-4' />
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default OrdersView;
