import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Factory, Gift, Star, X } from 'lucide-react';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { useCart } from '@/hooks/useCart';
import CartProduct from '@/components/cart-product';
import { AppDrawer } from '@/components/app-drawer';

interface DetailProps {
	product: ProductDetails;
}

const Detail = ({ product }: DetailProps) => {
	const [selectedColor, setSelectedColor] = useState(0);
	const [quantity, setQuantity] = useState(1);

	const { add, items } = useCart();

	const { name, description, price, rating, colors, featuredImage } = product;

	const discountedPrice = Math.round(price.amount * (1 - price.discount / 100));

	const handleCheckout = () => console.log('object');

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
					${discountedPrice}
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
				{/* Quantity Selector */}
				<div className='flex items-center gap-4'>
					<span className='text-sm font-semibold text-foreground'>Quantity</span>
					<div className='flex items-center border border-border rounded-lg'>
						<button
							onClick={() => setQuantity(Math.max(1, quantity - 1))}
							className='px-3 py-2 hover:bg-muted transition-colors'
							aria-label='Decrease quantity'
						>
							−
						</button>
						<span className='px-4 py-2 min-w-12 text-center font-medium'>
							{quantity}
						</span>
						<button
							onClick={() => setQuantity(quantity + 1)}
							className='px-3 py-2 hover:bg-muted transition-colors'
							aria-label='Increase quantity'
						>
							+
						</button>
					</div>
				</div>
			</div>

			{/* CTA Button */}
			<AppDrawer
				trigger={
					<button className='w-full bg-brand-700 hover:bg-brand-800 text-white font-semibold py-3 text-lg rounded-full'>
						Add to Cart
					</button>
				}
				title='cart'
				onTriggerClick={() => add(product)}
				footerButton={{
					label: 'Next',
					onClick: handleCheckout,
				}}
			>
				{items.map((item, index) => (
					<CartProduct
						key={`${item.id}-${index}`}
						name={name}
						description={description}
						price={discountedPrice}
						colors={colors}
						selectedColor={selectedColor}
						image={featuredImage}
						quantity={quantity}
					/>
				))}
			</AppDrawer>

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
