import { useEffect, useState } from 'react';
import { FooterButtonSetterType } from './checkout-drawer';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { toast } from 'sonner';
import {
	AlertCircle,
	ChevronRight,
	Clock,
	CreditCard,
	Mail,
	MapPin,
	ShoppingBag,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface OrderSummaryViewProps {
	checkoutSession: CheckoutSession;
	setFooterButton: FooterButtonSetterType;
	next: () => void;
}

const OrderSummaryView = ({
	checkoutSession,
	setFooterButton,
	next,
}: OrderSummaryViewProps) => {
	const {
		cart,
		shippingAddress,
		customerEmail,
		subtotal,
		tax,
		shippingFee,
		total,
	} = checkoutSession;
	const items = cart?.items || [];

	// Countdown timer logic
	const [timeLeft, setTimeLeft] = useState('');

	const intendPayment = useCheckoutStore((state) => state.intendPayment);

	const onEditAddress = () => {
		// Logic to go back to address view
		// next();
		console.log('Edit address');
	};

	useEffect(() => {
		if (!checkoutSession?.expiresAt) return;

		const calculateTimeLeft = () => {
			const expiryTime = new Date(checkoutSession.expiresAt).getTime();
			const now = new Date().getTime();
			const difference = expiryTime - now;

			if (difference <= 0) {
				setTimeLeft('Expired');
				return;
			}

			const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((difference % (1000 * 60)) / 1000);
			setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
		};

		calculateTimeLeft();
		const timer = setInterval(calculateTimeLeft, 1000);

		return () => clearInterval(timer);
	}, [checkoutSession?.expiresAt]);

	// Set footer button
	useEffect(() => {
		const handlePaymentIntent = async () => {
			try {
				await intendPayment(checkoutSession.publicToken);
				next();
			} catch (error) {
				console.error(error);
				toast.error(
					error instanceof Error
						? error.message
						: 'An error occured while creating payment intent',
				);
			}
		};

		setFooterButton({
			label: 'Continue to Payment',
			action: handlePaymentIntent,
		});
	}, [intendPayment, checkoutSession, setFooterButton, next, timeLeft]);

	const isExpired = timeLeft === 'Expired';

	return (
		<div className=''>
			{/* 1. Header & Timer */}
			<div className='p-5 border-b border-border space-y-4'>
				<div className='flex items-center gap-2 text-foreground font-semibold'>
					<ShoppingBag className='size-5 text-brand-800' />
					<h2>Order Summary</h2>
					<span className='text-grey-400 font-normal text-sm ml-auto'>
						{items.length} {items.length === 1 ? 'Item' : 'Items'}
					</span>
				</div>

				{/* Session Expiry Timer - Redesigned */}
				{checkoutSession?.expiresAt && timeLeft && (
					<div
						className={cn(
							'flex items-center gap-3 p-3 rounded-lg border transition-colors',
							isExpired
								? 'bg-destructive/10 border-destructive/20 text-destructive'
								: 'bg-brand-50 border-brand-100 text-brand-900',
						)}
					>
						{isExpired ? (
							<AlertCircle className='size-4 shrink-0' />
						) : (
							<Clock className='size-4 shrink-0 text-brand-700' />
						)}
						<div className='flex-1 flex justify-between items-center text-sm'>
							<span className='font-medium opacity-90'>
								{isExpired ? 'Session Expired' : 'Complete order in:'}
							</span>
							<span
								className={`font-bold font-mono tracking-tight ${!isExpired && 'text-brand-700'}`}
							>
								{timeLeft}
							</span>
						</div>
					</div>
				)}
			</div>

			<div className='p-5 space-y-8'>
				{/* 2. Customer Info Group */}
				{(customerEmail || shippingAddress) && (
					<div className='space-y-3'>
						<h3 className='text-xs font-semibold text-grey-500 uppercase tracking-wider'>
							Details
						</h3>
						<div className='border border-border rounded-lg divide-y divide-border bg-background'>
							{/* Email Row */}
							{customerEmail && (
								<div className='flex items-center gap-3 p-3'>
									<div className='p-2 bg-muted rounded-md shrink-0 text-grey-500'>
										<Mail className='size-4' />
									</div>
									<div className='flex-1 min-w-0'>
										<p className='text-xs text-muted-foreground'>Confirmation email</p>
										<p className='text-sm font-medium text-foreground truncate'>
											{customerEmail}
										</p>
									</div>
								</div>
							)}

							{/* Address Row */}
							{shippingAddress && (
								<div className='flex items-start gap-3 p-3 relative group'>
									<div className='p-2 bg-muted rounded-md shrink-0 text-grey-500 mt-0.5'>
										<MapPin className='size-4' />
									</div>
									<div className='flex-1 min-w-0'>
										<div className='flex justify-between items-start'>
											<p className='text-xs text-muted-foreground'>Shipping to</p>
											{onEditAddress && (
												<button
													onClick={onEditAddress}
													className='text-xs font-medium text-brand-800 hover:text-brand-600 transition-colors cursor-pointer'
												>
													Edit
												</button>
											)}
										</div>
										<p className='text-sm font-medium text-foreground mt-0.5'>
											{shippingAddress.firstName} {shippingAddress.lastName}
										</p>
										<p className='text-sm text-grey-600 truncate'>
											{shippingAddress.address}, {shippingAddress.city}
										</p>
										<p className='text-sm text-grey-600'>{shippingAddress.country}</p>
									</div>
								</div>
							)}
						</div>
					</div>
				)}

				{/* 3. Items List */}
				<div className='space-y-3'>
					<h3 className='text-xs font-semibold text-grey-500 uppercase tracking-wider'>
						Items
					</h3>
					<div className='space-y-4 max-h-[300px] overflow-y-auto scrollbar-hide pr-1'>
						{items.map((item) => (
							<div key={item.id} className='flex gap-4 group'>
								{/* Product Image */}
								<div className='relative bg-muted rounded-lg overflow-hidden size-16 shrink-0 border border-border group-hover:border-brand-300 transition-colors'>
									{item.productImage ? (
										<Image
											src={item.productImage.src}
											alt={item.productImage.alt}
											fill
											className='size-full object-cover'
										/>
									) : (
										<div
											className='size-full flex items-center justify-center text-xs text-muted-foreground'
											style={{
												backgroundColor: item.color ? `${item.color}20` : undefined,
											}}
										>
											{/* Fallback if no image */}
											<div
												className='size-3 rounded-full'
												style={{ backgroundColor: item.color }}
											/>
										</div>
									)}
								</div>

								{/* Details */}
								<div className='flex-1 min-w-0 flex flex-col justify-center'>
									<div className='flex justify-between items-start gap-2'>
										<h4 className='font-medium text-foreground text-sm leading-tight line-clamp-2'>
											{item.productName}
										</h4>
										<span className='font-semibold text-foreground text-sm shrink-0'>
											${(Number(item.unitPrice) * item.quantity).toFixed(2)}
										</span>
									</div>
									<div className='flex items-center gap-2 mt-1.5'>
										{item.color && (
											<div className='flex items-center gap-1.5 px-1.5 py-0.5 border border-border rounded text-[10px] text-muted-foreground bg-background'>
												<span
													className='size-2 rounded-full'
													style={{ backgroundColor: item.color }}
												/>
												{/* Assuming you might map hex to name, otherwise just hide text or show hex */}
												<span>Color</span>
											</div>
										)}
										<span className='text-xs text-muted-foreground border-l border-border pl-2'>
											Qty {item.quantity}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* 4. Cost Breakdown */}
				<div className='space-y-3 pt-6 border-t border-border'>
					<div className='flex justify-between text-sm'>
						<span className='text-grey-600'>Subtotal</span>
						<span className='font-medium text-foreground'>
							${Number(subtotal).toFixed(2)}
						</span>
					</div>
					<div className='flex justify-between text-sm'>
						<span className='text-grey-600'>Shipping</span>
						<span className='font-medium text-foreground'>
							{shippingFee === 0 ? 'Free' : `$${Number(shippingFee).toFixed(2)}`}
						</span>
					</div>
					<div className='flex justify-between text-sm'>
						<span className='text-grey-600'>Tax</span>
						<span className='font-medium text-foreground'>
							${Number(tax).toFixed(2)}
						</span>
					</div>

					{/* Total */}
					<div className='flex justify-between items-end pt-3 pb-1'>
						<span className='text-base font-semibold text-foreground'>Total</span>
						<div className='text-right'>
							<span className='block text-2xl font-bold text-brand-800 leading-none'>
								${Number(total).toFixed(2)}
							</span>
							<span className='text-[10px] text-grey-400 font-medium uppercase tracking-wide'>
								USD
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* 5. Next Step Preview */}
			<div className='bg-muted/50 p-4 border-t border-border flex items-center gap-3 text-grey-600'>
				<CreditCard className='size-4 shrink-0' />
				<p className='text-xs'>Secure payment processing on the next step.</p>
				<ChevronRight className='size-4 ml-auto opacity-50' />
			</div>
		</div>
	);
};

export default OrderSummaryView;
