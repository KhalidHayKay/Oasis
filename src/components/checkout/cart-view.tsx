import Image from 'next/image';
import CartProduct from '../cart-product';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '../ui/button';
import { FooterButtonSetterType } from './checkout-drawer';
import { useEffect, useCallback } from 'react';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';

interface CartViewProps {
	items: CartItem[];
	setFooterButton: FooterButtonSetterType;
	onAuthRequired: () => void;
	next: () => void;
}

const CartView = ({
	items,
	setFooterButton,
	onAuthRequired,
	next,
}: CartViewProps) => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const clearCart = useCartStore((state) => state.clearCart);
	const checkout = useCheckoutStore((state) => state.checkout);

	useEffect(() => {
		// Only set footer button if cart has items
		if (items.length === 0) {
			setFooterButton(null);
			return;
		}

		const handleCheckoutAttempt = async () => {
			if (!isAuthenticated) {
				onAuthRequired();
				return;
			}

			try {
				await checkout();
				next?.();
			} catch (error) {
				toast.error(
					error instanceof Error ? error.message : 'Could not process checkout',
				);
			}
		};

		setFooterButton({
			label: 'Checkout',
			action: handleCheckoutAttempt,
		});

		return () => setFooterButton(null);
	}, [
		items.length,
		checkout,
		isAuthenticated,
		onAuthRequired,
		next,
		setFooterButton,
	]);

	if (items.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center py-20'>
				<h2 className='text-xl font-semibold text-shadow-grey-500 mb-4'>
					Your cart is empty
				</h2>
				<Image
					src='/images/Squircle_em.png'
					alt='Empty cart'
					width={200}
					height={200}
				/>
			</div>
		);
	}

	const subtotal = items.reduce((total, item) => {
		return total + Number(item.unitPrice) * item.quantity;
	}, 0);

	return (
		<div className='flex flex-col h-full'>
			{/* Cart Items */}
			<div className='flex-1 overflow-y-auto space-y-4 pb-5'>
				{items.map((item) => {
					return <CartProduct key={item.id} item={item} />;
				})}
			</div>

			{/* Subtotal and Clear Cart Section */}
			{items.length > 0 && (
				<div className='pt-4 pb-10 space-y-3'>
					<div className='flex justify-between items-center'>
						<span className='text-lg font-medium text-foreground'>Subtotal</span>
						<span className='text-xl font-semibold text-brand-800'>
							${subtotal.toFixed(2)}
						</span>
					</div>
					<Button
						variant='outline'
						onClick={clearCart}
						className='w-full py-2 text-sm font-medium text-destructive hover:text-destructive/80 transition-colors'
					>
						Clear Cart
					</Button>
				</div>
			)}
		</div>
	);
};

export default CartView;
