import { ArrowLeft, CreditCard, MapPin } from 'lucide-react';
import { FormatCurrency, FormatDate } from './format';
import OrderTracker from './tracker';
import Link from 'next/link';
import routes from '@/config/routes';

const OrderDetail = ({ order }: { order: Order }) => {
	return (
		<div className='animate-in fade-in slide-in-from-right-4 duration-300'>
			{/* Header Navigation */}
			<Link
				href={routes.page.orders.all}
				className='group flex items-center gap-2 text-sm text-grey-500 hover:text-brand-800 mb-6 transition-colors'
			>
				<ArrowLeft className='size-4 group-hover:-translate-x-1 transition-transform' />
				Back to Orders
			</Link>

			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'>
				<div>
					<h1 className='text-2xl sm:text-3xl font-semibold text-foreground flex items-center gap-3'>
						Order #{order.orderNumber}
					</h1>
					<p className='text-grey-500 mt-1 flex items-center gap-2 text-sm'>
						Placed on <FormatDate date={order.createdAt} />
					</p>
				</div>
				<div className='flex items-center gap-3'>
					{/* Action Buttons could go here (Download Invoice, etc) */}
					<button className='px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors'>
						Invoice
					</button>
					<button className='px-4 py-2 bg-brand-800 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors shadow-sm shadow-brand-200'>
						Track Order
					</button>
				</div>
			</div>

			{/* Visual Status Tracker */}
			<OrderTracker status={order.status} />

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				{/* Left Column: Items */}
				<div className='lg:col-span-2 space-y-6'>
					<div className='border border-border rounded-xl overflow-hidden bg-card'>
						<div className='bg-muted/30 px-6 py-4 border-b border-border'>
							<h3 className='font-semibold text-foreground'>
								Items ({order.items.length})
							</h3>
						</div>
						<div className='divide-y divide-border'>
							{order.items.map((item) => (
								<div key={item.id} className='p-6 flex gap-4 sm:gap-6'>
									{/* Image Container matching your system */}
									<div className='relative bg-muted rounded-lg overflow-hidden shrink-0 size-20 sm:size-24 flex items-center justify-center'>
										<img
											src={item.productImage.src}
											alt={item.productName}
											className='size-full object-cover'
										/>
									</div>

									<div className='flex-1 flex flex-col justify-between py-1'>
										<div>
											<h4 className='font-medium text-foreground text-lg'>
												{item.productName}
											</h4>
											{item.color && <p className='text-sm text-grey-500'>{item.color}</p>}
										</div>
										<div className='flex justify-between items-end mt-2'>
											<p className='text-sm text-grey-600'>Qty: {item.quantity}</p>
											<span className='font-semibold text-brand-800 text-lg'>
												<FormatCurrency value={item.unitPrice} />
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Right Column: Summary & Info */}
				<div className='space-y-6'>
					{/* Order Summary Card */}
					<div className='border border-border rounded-xl bg-card p-6 space-y-4'>
						<h3 className='font-semibold text-foreground mb-2'>Order Summary</h3>
						<div className='space-y-2 text-sm'>
							<div className='flex justify-between text-grey-600'>
								<span>Subtotal</span>
								<span>
									<FormatCurrency value={order.subtotal} />
								</span>
							</div>
							<div className='flex justify-between text-grey-600'>
								<span>Shipping</span>
								<span>
									{order.shippingFee === 0 ? (
										'Free'
									) : (
										<FormatCurrency value={order.shippingFee} />
									)}
								</span>
							</div>
							<div className='flex justify-between text-grey-600'>
								<span>Tax</span>
								<span>
									<FormatCurrency value={order.tax} />
								</span>
							</div>
						</div>
						<div className='border-t border-border pt-4 flex justify-between items-center'>
							<span className='font-semibold text-foreground'>Total</span>
							<span className='font-bold text-xl text-brand-800'>
								<FormatCurrency value={order.total} />
							</span>
						</div>
					</div>

					{/* Customer Details Card */}
					<div className='border border-border rounded-xl bg-card p-6 space-y-6'>
						{/* Shipping Address */}
						<div className='flex gap-3'>
							<MapPin className='size-5 text-grey-400 shrink-0 mt-0.5' />
							<div>
								<h4 className='font-medium text-foreground text-sm mb-1'>
									Shipping Address
								</h4>
								<address className='text-sm text-grey-600 not-italic leading-relaxed'>
									{order.shippingAddress.address}
									<br />
									{order.shippingAddress.city}, {order.shippingAddress.country}{' '}
									{order.shippingAddress.fname}, {order.shippingAddress.lname}
									<br />
									{order.shippingAddress.country}
								</address>
							</div>
						</div>

						{/* Payment Info */}
						<div className='flex gap-3'>
							<CreditCard className='size-5 text-grey-400 shrink-0 mt-0.5' />
							<div>
								<h4 className='font-medium text-foreground text-sm mb-1'>
									Payment Method
								</h4>
								<p className='text-sm text-grey-600'>Visa ending in 4242</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderDetail;
