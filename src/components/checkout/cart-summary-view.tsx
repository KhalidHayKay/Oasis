import { useEffect, useState } from 'react';
import { FooterButtonSetterType } from './checkout-drawer';

interface CartSummaryViewProps {
	items: CartItem[];
	checkoutSession: CheckoutSession | null;
	setFooterButton: FooterButtonSetterType;
	next: () => void;
}

const CartSummaryView = ({
	items,
	checkoutSession,
	setFooterButton,
	next,
}: CartSummaryViewProps) => {
	const subtotal = items.reduce(
		(sum, item) => sum + Number(item.unitPrice) * item.quantity,
		0,
	);

	// Countdown timer logic
	const [timeLeft, setTimeLeft] = useState('');

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

	const createOrder = async () => {
		// try {
		// }
	};

	return (
		<div className='space-y-6 sm:px-5'>
			{/* Customer Email */}
			{checkoutSession?.customerEmail && (
				<div className='bg-muted rounded-xl p-4'>
					<p className='text-sm text-muted-foreground'>
						Order confirmation will be sent to:{' '}
						<span className='font-medium text-foreground'>
							{checkoutSession.customerEmail}
						</span>
					</p>
				</div>
			)}

			{/* Shipping Address */}
			{checkoutSession?.shippingAddress && (
				<div className='bg-muted rounded-xl p-4 space-y-2'>
					<p className='text-sm font-medium text-foreground'>Shipping to:</p>
					<div className='text-sm text-muted-foreground leading-relaxed'>
						<p className='font-medium text-foreground'>
							{checkoutSession.shippingAddress.name}
						</p>
						<p>{checkoutSession.shippingAddress.address}</p>
						<p>
							{checkoutSession.shippingAddress.city},{' '}
							{checkoutSession.shippingAddress.state}
						</p>
						<p className='mt-1'>{checkoutSession.shippingAddress.phone}</p>
					</div>
				</div>
			)}

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

			{/* Items List */}
			<div className='space-y-4'>
				{items.map((item) => (
					<div
						key={item.id}
						className='flex gap-4 pb-4 border-b border-border last:border-0'
					>
						{/* Product Image */}
						<div className='relative bg-muted rounded-lg overflow-hidden w-20 h-20 shrink-0'>
							<div
								className='w-full h-full flex items-center justify-center text-xs text-muted-foreground'
								style={{ backgroundColor: item.color + '20' }}
							>
								Product
							</div>
						</div>

						{/* Product Details */}
						<div className='flex-1 min-w-0'>
							<h3 className='font-medium text-foreground truncate'>
								{item.productName}
							</h3>
							<p className='text-sm text-muted-foreground mt-0.5'>
								Qty: {item.quantity}
							</p>
							<div className='flex items-center gap-2 mt-1'>
								<div
									className='w-4 h-4 rounded-full border border-border'
									style={{ backgroundColor: item.color }}
								/>
							</div>
						</div>

						{/* Price */}
						<div className='text-right shrink-0'>
							<p className='font-semibold text-foreground'>
								${(Number(item.unitPrice) * item.quantity).toFixed(2)}
							</p>
							<p className='text-sm text-muted-foreground'>
								${Number(item.unitPrice).toFixed(2)} each
							</p>
						</div>
					</div>
				))}
			</div>

			{/* Subtotal Section */}
			<div className='pt-4 border-t border-border'>
				<div className='flex justify-between items-center'>
					<span className='text-lg font-medium text-foreground'>Subtotal</span>
					<span className='text-xl font-semibold text-brand-800'>
						${subtotal.toFixed(2)}
					</span>
				</div>
				<p className='text-sm text-muted-foreground mt-2'>
					Shipping and taxes calculated at next step
				</p>
			</div>
		</div>
	);
};

export default CartSummaryView;
