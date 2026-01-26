import { useEffect, useState } from 'react';
import { FooterButtonSetterType } from './checkout-drawer';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { toast } from 'sonner';

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
	}, [setFooterButton, next, timeLeft]);

	return (
		<div className='space-y-6 sm:px-5'>
			{/* Session Expiry Timer */}
			{checkoutSession?.expiresAt && timeLeft && (
				<div className='flex items-center justify-between bg-brand-50 dark:bg-brand-800/10 border border-brand-200 dark:border-brand-800/30 rounded-xl p-3'>
					<span className='text-sm text-muted-foreground'>
						Complete your order within:
					</span>
					<span
						className={`text-sm font-semibold ${
							timeLeft === 'Expired' ? 'text-destructive' : 'text-brand-800'
						}`}
					>
						{timeLeft === 'Expired' ? 'Session Expired' : timeLeft}
					</span>
				</div>
			)}

			{/* Customer Email */}
			{customerEmail && (
				<div className='bg-muted rounded-xl p-4'>
					<p className='text-sm text-muted-foreground'>
						Order confirmation will be sent to:{' '}
						<span className='font-medium text-foreground'>{customerEmail}</span>
					</p>
				</div>
			)}

			{/* Shipping Address */}
			{shippingAddress && (
				<div className='bg-muted rounded-xl p-4 space-y-2'>
					<div className='flex items-center justify-between'>
						<p className='text-sm font-medium text-foreground'>Shipping to:</p>
						<button
							className='text-xs text-brand-600 hover:text-brand-700 font-medium'
							onClick={() => {
								/* Navigate back to edit address */
							}}
						>
							Edit
						</button>
					</div>
					<div className='text-sm text-muted-foreground leading-relaxed'>
						<p className='font-medium text-foreground'>
							{shippingAddress.firstName} {shippingAddress.lastName}
						</p>
						<p>{shippingAddress.address}</p>
						<p>
							{shippingAddress.city}, {shippingAddress.country}
						</p>
						<p className='mt-1'>{shippingAddress.phone}</p>
					</div>
				</div>
			)}

			{/* Order Items Summary */}
			<div className='space-y-3'>
				<h3 className='text-lg font-medium text-foreground'>Order Summary</h3>

				<div className='space-y-3'>
					{items.map((item) => (
						<div
							key={item.id}
							className='flex gap-3 pb-3 border-b border-border last:border-0'
						>
							{/* Product Image */}
							<div className='relative bg-muted rounded-lg overflow-hidden w-16 h-16 shrink-0'>
								<div
									className='w-full h-full flex items-center justify-center text-xs text-muted-foreground'
									style={{ backgroundColor: item.color + '20' }}
								>
									<span className='sr-only'>{item.productName}</span>
								</div>
							</div>

							{/* Product Details */}
							<div className='flex-1 min-w-0'>
								<h4 className='font-medium text-foreground text-sm truncate'>
									{item.productName}
								</h4>
								<div className='flex items-center gap-2 mt-1'>
									<div
										className='w-3 h-3 rounded-full border border-border'
										style={{ backgroundColor: item.color }}
									/>
									<span className='text-xs text-muted-foreground'>
										Qty: {item.quantity}
									</span>
								</div>
							</div>

							{/* Price */}
							<div className='text-right shrink-0'>
								<p className='font-semibold text-foreground text-sm'>
									${(Number(item.unitPrice) * item.quantity).toFixed(2)}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Cost Breakdown */}
			<div className='space-y-3 pt-4 border-t border-border'>
				<div className='flex justify-between text-sm'>
					<span className='text-muted-foreground'>Subtotal</span>
					<span className='font-medium text-foreground'>
						${Number(subtotal).toFixed(2)}
					</span>
				</div>

				<div className='flex justify-between text-sm'>
					<span className='text-muted-foreground'>Shipping</span>
					<span className='font-medium text-foreground'>
						${Number(shippingFee).toFixed(2)}
					</span>
				</div>

				<div className='flex justify-between text-sm'>
					<span className='text-muted-foreground'>Tax</span>
					<span className='font-medium text-foreground'>
						${Number(tax).toFixed(2)}
					</span>
				</div>
			</div>

			{/* Total */}
			<div className='pt-4 border-t-2 border-border'>
				<div className='flex justify-between items-center'>
					<span className='text-lg font-semibold text-foreground'>Total</span>
					<span className='text-2xl font-bold text-brand-800'>
						${Number(total).toFixed(2)}
					</span>
				</div>
			</div>

			{/* Payment Method Preview */}
			<div className='bg-muted rounded-xl p-4 space-y-2'>
				<p className='text-sm font-medium text-foreground'>Next Step: Payment</p>
				<p className='text-sm text-muted-foreground'>
					You'll securely enter your payment information on the next screen
				</p>
			</div>
		</div>
	);
};

export default OrderSummaryView;
