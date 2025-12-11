import Image from 'next/image';
import { useState } from 'react';

interface CartProductProps {
	name: string;
	description: string;
	price: number;
	colors: string[];
	selectedColor: number;
	image: {
		src: string;
		alt: string;
	};
	quantity: number;
}

const CartProduct = ({
	name,
	description,
	price,
	colors,
	selectedColor: initialSelectedColor,
	image,
	quantity: initialQuantity,
}: CartProductProps) => {
	const [quantity, setQuantity] = useState(initialQuantity);
	const [selectedColor, setSelectedColor] = useState(initialSelectedColor);

	return (
		<div className='grid grid-cols-[1fr_2fr] items-center gap-x-5'>
			<div className='relative bg-muted rounded-lg overflow-hidden aspect-square flex items-center justify-center h-full w-full'>
				<Image
					width={600}
					height={400}
					src={image.src}
					alt={image.alt}
					className='object-cover'
				/>
			</div>
			<div className='flex flex-col h-full justify-around gap-y-3'>
				<div className='flex justify-between sm:flex-col gap-1'>
					<h1 className='text-lg md:text-xl font-medium sm:font-semibold text-foreground'>
						{name}
					</h1>
					<p className='hidden sm:block text-grey-600 text-sm leading-relaxed'>
						{description}
					</p>
					<span className='text-base sm:text-xl font-medium sm:font-semibold text-brand-800 mt-1'>
						${price}.00
					</span>
				</div>

				<div className='flex flex-row products-center justify-between py-3'>
					{/* Color Selection */}
					<div className='flex flex-col gap-3'>
						<div className='flex gap-3'>
							{colors.map((color, index) => (
								<button
									key={index}
									onClick={() => setSelectedColor(index)}
									className={`size-5 rounded-xl border-2 transition-all ${
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
					<div className='flex border border-border rounded-lg'>
						<button
							onClick={() => setQuantity(Math.max(1, quantity - 1))}
							className='px-2 py-1 hover:bg-muted transition-colors'
							aria-label='Decrease quantity'
						>
							−
						</button>
						<span className='px-2 py-1 min-w-7 text-center font-medium'>
							{quantity}
						</span>
						<button
							onClick={() => setQuantity(quantity + 1)}
							className='px-2 py-1 hover:bg-muted transition-colors'
							aria-label='Increase quantity'
						>
							+
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartProduct;
