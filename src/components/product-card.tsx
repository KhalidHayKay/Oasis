'use client';

import { useState } from 'react';
// import { motion, AnimatePresence } from 'motion';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import AppButton from './app-button';
import currency from '@/lib/utils/currency';

interface ProductCardProps {
	product: Product;
}
const ProductCard = ({ product }: ProductCardProps) => {
	const [isHovered, setIsHovered] = useState(false);
	// const [selectedColor, setSelectedColor] = useState(0);

	const { name, price, featuredImage } = product;

	return (
		<div className='flex flex-col min-h-[200px] sm:min-h-[350px] md:min-h-[500px]'>
			<motion.div
				className='flex-1 relative w-full aspect-square bg-secondary rounded-lg overflow-hidden mb-4 flex items-center justify-center cursor-pointer'
				onHoverStart={() => setIsHovered(true)}
				onHoverEnd={() => setIsHovered(false)}
			>
				<Image
					src={featuredImage || '/placeholder.svg'}
					alt={name}
					width={600}
					height={400}
					className='w-full h-full object-cover'
				/>

				<AnimatePresence>
					{isHovered && (
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							transition={{ duration: 0.3 }}
							className='absolute bottom-4 left-4'
						>
							<AppButton className='px-5! py-7'>
								<ShoppingCart className='w-4 h-4' />
								Add to cart
							</AppButton>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>

			<div className='flex flex-col'>
				<div className='flex justify-between items-center gap-2 mb-2'>
					<h3 className='font-medium text-base sm:text-xl text-foreground line-clamp-2 flex-1  max-w-2/4 truncate'>
						{name}
					</h3>
					<span className='font-medium text-sm sm:text-lg bg-accent p-3 rounded-full text-foreground whitespace-nowrap'>
						{currency.code(price.currency)} {price.amount.toFixed(0)}
					</span>
				</div>

				{/* Color Options */}
				{/* <div className='flex gap-2 mt-auto'>
					{product.colors.map((color, index) => (
						<motion.button
							key={index}
							className={`w-4 h-4 rounded-full ring-2 transition-all ${
								selectedColor === index
									? 'ring-foreground ring-offset-1'
									: 'ring-transparent hover:ring-muted-foreground'
							}`}
							style={{ backgroundColor: color }}
							onClick={() => setSelectedColor(index)}
							whileHover={{ scale: 1.15 }}
							whileTap={{ scale: 0.95 }}
						/>
					))}
				</div> */}
			</div>
		</div>
	);
};

export const ProductCardSkeleton = () => (
	<div className='flex flex-col min-h-[200px] sm:min-h-[350px] md:min-h-[500px] animate-pulse'>
		{/* Image Placeholder */}
		<div className='flex-1 relative w-full aspect-square bg-gray-300 rounded-lg mb-4' />

		{/* Title and Price */}
		<div className='flex flex-col gap-2'>
			<div className='flex justify-between items-center gap-2 mb-2'>
				<div className='h-5 sm:h-6 bg-gray-300 rounded w-2/3'></div>
				<div className='h-5 sm:h-6 bg-gray-300 rounded w-1/4'></div>
			</div>

			{/* Color options placeholder */}
			{/* <div className='flex gap-2 mt-auto'>
				<div className='w-4 h-4 rounded-full bg-gray-300'></div>
				<div className='w-4 h-4 rounded-full bg-gray-300'></div>
				<div className='w-4 h-4 rounded-full bg-gray-300'></div>
			</div> */}
		</div>
	</div>
);

export default ProductCard;
