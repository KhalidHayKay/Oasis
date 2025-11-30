import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface DetailProps {
	product: ProductDetails;
}

const Detail = ({ product }: DetailProps) => {
	const [selectedColor, setSelectedColor] = useState(0);
	const [quantity, setQuantity] = useState(1);

	const { name, description, price, rating, colors } = product;

	const discountedPrice = Math.round(price.amount * (1 - price.discount / 100));

	return (
		<div className='flex-1 flex flex-col gap-6'>
			{/* Header Info */}
			<div className='flex flex-col gap-3'>
				<h1 className='text-3xl md:text-4xl font-bold text-foreground'>{name}</h1>

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
						({Math.round(rating * 10) / 10})
					</span>
				</div>
			</div>

			{/* Price Section */}
			<div className='flex items-baseline gap-3'>
				<span className='text-3xl font-bold text-foreground'>
					${discountedPrice}
				</span>
				<span className='text-lg text-muted-foreground line-through'>
					${price.amount}
				</span>
				<span className='text-sm font-semibold text-red-600'>
					-{price.discount}%
				</span>
			</div>

			{/* Description */}
			<p className='text-foreground text-base leading-relaxed'>{description}</p>

			{/* Color Selection */}
			<div className='flex flex-col gap-3'>
				<span className='text-sm font-semibold text-foreground'>Colors</span>
				<div className='flex gap-3'>
					{colors.map((color, index) => (
						<button
							key={index}
							onClick={() => setSelectedColor(index)}
							className={`w-10 h-10 rounded-full border-2 transition-all ${
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

			{/* CTA Button */}
			<Button
				size='lg'
				className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg rounded-lg'
			>
				Buy now
			</Button>

			{/* Additional Info */}
			<Card className='p-4 bg-card border border-border'>
				<div className='flex flex-col gap-3 text-sm'>
					<div className='flex items-start gap-2'>
						<input
							type='checkbox'
							id='free-shipping'
							className='mt-1'
							defaultChecked
						/>
						<label htmlFor='free-shipping' className='text-foreground'>
							Pre-import routed
						</label>
					</div>
					<div className='flex items-start gap-2'>
						<input type='checkbox' id='import' className='mt-1' defaultChecked />
						<label htmlFor='import' className='text-foreground'>
							Arrive from second to current country
						</label>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default Detail;
