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
		<div className='flex flex-col h-full bg-background'>
			{/* Cart Items List */}
			<div className='flex-1 overflow-y-auto space-y-6 pb-5 pr-2 scrollbar-hide'>
				{items.map((item) => (
					<CartProduct key={item.id} item={item} />
				))}
			</div>

			{/* Footer: Subtotal and Clear Cart */}
			{items.length > 0 && (
				<div className='pt-6 pb-10 border-t border-border bg-background mt-auto'>
					<div className='flex justify-between items-baseline mb-6'>
						<span className='text-grey-500 font-medium tracking-tight'>Subtotal</span>
						<div className='text-right'>
							<span className='text-2xl font-bold text-brand-800 block'>
								${subtotal.toFixed(2)}
							</span>
							<span className='text-[10px] text-grey-400 uppercase tracking-widest font-semibold'>
								Shipping & taxes calculated at checkout
							</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartView;
