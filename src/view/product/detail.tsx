import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Factory, Gift, Star, X } from 'lucide-react';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import CartProduct from '@/components/cart-product';

interface DetailProps {
	product: ProductDetails;
}

const Detail = ({ product }: DetailProps) => {
	const [selectedColor, setSelectedColor] = useState(0);
	const [quantity, setQuantity] = useState(1);

	const { add, items } = useCart();

	const { name, description, price, rating, colors, featuredImage } = product;

	const discountedPrice = Math.round(price.amount * (1 - price.discount / 100));

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
			<Drawer direction='right'>
				<DrawerTrigger
					className='w-full bg-brand-700 hover:bg-brand-800 text-white font-semibold py-3 text-lg rounded-full'
					onClick={() => add(product)}
				>
					Add to Cart
				</DrawerTrigger>
				<DrawerContent className='min-w-full md:min-w-3/4 lg:min-w-1/2'>
					<DrawerClose className='w-fit absolute top-7 left-5'>
						<div className='size-8 flex items-center justify-center rounded-full bg-grey-200/20 hover:bg-grey-200/50'>
							<X className='text-foreground size-4' />
						</div>
					</DrawerClose>
					<div className='py-5 px-5 sm:px-15 xl:px-30 w-full'>
						<DrawerHeader className='flex-row justify-center'>
							<DrawerTitle className='text-2xl font-semibold'>cart</DrawerTitle>
						</DrawerHeader>
						<div className='mt-15 -mb-5 h-[calc(100vh-200px)]'>
							<div className='pt-2 flex flex-col gap-y-10 overflow-y-auto min-h-full max-h-full scrollbar-hide'>
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
							</div>
						</div>
					</div>
					<DrawerFooter className='absolute bottom-0 left-0 w-full h-12 p-0'>
						<Button className='size-full bg-brand-700 hover:bg-brand-800 rounded-none py-4'>
							Next
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>

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
