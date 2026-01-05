import { useMemo, useState } from 'react';
import { Factory, Gift, Star } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import CartProduct from '@/components/cart-product';
import { AppDrawer } from '@/components/app-drawer';
import { useCartStore } from '@/store/useCartStore';
import { processDiscount } from '@/lib/utils';

interface DetailProps {
	product: ProductDetails;
}

const Detail = ({ product }: DetailProps) => {
	const [selectedColor, setSelectedColor] = useState(0);
	const [quantity, setQuantity] = useState(1);

	// const { add, items } = useCart();
	const addItem = useCartStore((state) => state.addItem);
	const updateQuantity = useCartStore((state) => state.updateQuantity);
	const items = useCartStore((state) => state.items);
	const isLoading = useCartStore((state) => state.isLoading);
	const isSyncing = useCartStore((state) => state.isSyncing);

	const { id, name, description, price, rating, colors } = product;

	// const handleCheckout = () => console.log('object');

	const cartItem = items.find(
		(item) =>
			item.productId === product.id && item.color === colors[selectedColor]
	);

	const hasEntry = !!cartItem;

	return (
		<div className='flex-1 flex flex-col gap-6'>
			{/* Header Info */}
			<div className='flex flex-col gap-3'>
				<h1 className='text-3xl md:text-4xl font-semibold text-foreground'>
					{name}
				</h1>

				{/* Rating */}
				<div className='flex items-center gap-2'>
					<div className='flex items-center gap-1'>
						{[...Array(5)].map((_, i) => (
							<Star
								key={i}
								className={`w-4 h-4 ${
									i < Math.floor(rating)
										? 'fill-yellow-400 text-yellow-400'
										: 'text-muted-foreground'
								}`}
							/>
						))}
					</div>
					<span className='text-sm text-muted-foreground'>
						{Math.round(rating * 10) / 10} stars
					</span>
				</div>
			</div>

			{/* Price Section */}
			<div className='flex items-center gap-3'>
				<span className='text-4xl font-semibold text-brand-800'>
					${processDiscount(price)}
				</span>
				<span className='text-sm text-muted-foreground line-through'>
					${price.amount}
				</span>
				<span className='text-sm font-semibold text-red-500 bg-red-100 py-2 px-4 rounded-full'>
					-{price.discount}%
				</span>
			</div>

			{/* Description */}
			<p className='text-grey-600 text-lg leading-relaxed'>{description}</p>

			<div className='flex items-center justify-between py-3'>
				{/* Color Selection */}
				<div className='flex flex-col gap-3'>
					<span className='text-sm font-semibold text-foreground'>Colors</span>
					<div className='flex gap-3'>
						{colors.map((color, index) => (
							<button
								key={index}
								onClick={() => setSelectedColor(index)}
								className={`w-10 h-10 rounded-xl border-2 transition-all ${
									selectedColor === index
										? 'border-primary ring-2 ring-primary ring-offset-2'
										: 'border-border'
								}`}
								style={{ backgroundColor: color }}
								aria-label={`Color option ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</div>

			{/* CTA Button */}
			{!hasEntry ? (
				<button
					disabled={isLoading || isSyncing}
					onClick={() => addItem(product, quantity, colors[selectedColor])}
					className='w-full bg-brand-700 disabled:bg-brand-700/50 hover:bg-brand-800 disabled:hover:bg-brand-800/50 text-white font-semibold py-3 text-lg rounded-full'
				>
					Add to Cart
				</button>
			) : (
				<div className='flex items-center justify-between w-full border border-brand-700 rounded-full px-4 py-2'>
					<button
						disabled={isLoading || isSyncing}
						onClick={() => updateQuantity(cartItem, cartItem.quantity - 1)}
						className='text-2xl font-bold px-3'
					>
						−
					</button>

					<span className='text-lg font-semibold'>{cartItem.quantity}</span>

					<button
						disabled={isLoading || isSyncing}
						onClick={() => updateQuantity(cartItem, cartItem.quantity + 1)}
						className='text-2xl font-bold px-3'
					>
						+
					</button>
				</div>
			)}

			{/* Additional Info */}
			<div className='flex flex-col gap-3 text-foreground text-sm sm:text-base'>
				<div className='flex items-center gap-3'>
					<Gift className='size-5' />
					<p className=''>Free shipping included</p>
				</div>

				<div className='flex items-center gap-3'>
					<Factory className='size-5' />
					<p className=''>made from the best of materials sourced</p>
				</div>
			</div>
		</div>
	);
};

export default Detail;
