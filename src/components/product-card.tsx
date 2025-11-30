'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import AppButton from './app-button';
import currency from '@/lib/utils/currency';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ProductCardProps {
	product: Product;
	className?: string;
}

interface ImageryProps {
	shouldHover: boolean;
	href: string;
	image: ProductImage;
}

const Imagery = ({ shouldHover, href, image }: ImageryProps) => {
	return (
		<>
			<Image
				src={image.src || '/placeholder.svg'}
				alt={image.alt || 'Product Image'}
				width={600}
				height={400}
				className='w-full h-full object-cover'
			/>

			{/* Only show button on hover-capable devices */}
			{shouldHover && (
				<AnimatePresence>
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.3 }}
						className='absolute bottom-4 left-4'
					>
						<Link href={href} className='flex-1'>
							<AppButton className='px-5! py-7'>
								Details
								<ArrowRight className='w-4 h-4' />
							</AppButton>
						</Link>
					</motion.div>
				</AnimatePresence>
			)}
		</>
	);
};

const ProductCard = ({ product, className }: ProductCardProps) => {
	const [selectedColor, setSelectedColor] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const [hasHoverCapability, setHasHoverCapability] = useState(false);

	const { id, name, price, featuredImage, colors } = product;

	const href = `/product/${id}`;

	// Detect if device has hover capability
	useEffect(() => {
		const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
		setHasHoverCapability(mediaQuery.matches);

		const handleChange = (e: MediaQueryListEvent) => {
			setHasHoverCapability(e.matches);
		};

		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	return (
		<div
			className={cn(
				'flex flex-col min-h-[200px] sm:min-h-[350px] md:min-h-[500px]',
				className
			)}
		>
			{hasHoverCapability ? (
				<motion.div
					className='flex-1 relative w-full aspect-square bg-secondary rounded-lg overflow-hidden flex items-center justify-center cursor-pointer'
					onHoverStart={() => hasHoverCapability && setIsHovered(true)}
					onHoverEnd={() => hasHoverCapability && setIsHovered(false)}
				>
					<Imagery
						shouldHover={hasHoverCapability && isHovered}
						href={href}
						image={featuredImage}
					/>
				</motion.div>
			) : (
				<motion.a
					href={`/product/${product.id}`}
					className='flex-1 relative w-full aspect-square bg-secondary rounded-lg overflow-hidden flex items-center justify-center cursor-pointer'
					onHoverStart={() => hasHoverCapability && setIsHovered(true)}
					onHoverEnd={() => hasHoverCapability && setIsHovered(false)}
				>
					<Imagery
						shouldHover={hasHoverCapability && isHovered}
						href={href}
						image={featuredImage}
					/>
				</motion.a>
			)}

			<div className='flex flex-col'>
				<div className='flex justify-between items-center gap-2'>
					<h3 className='font-medium text-base sm:text-xl text-foreground line-clamp-2 flex-1 max-w-2/4 truncate'>
						{name}
					</h3>
					<span className='font-medium text-sm sm:text-lg bg-accent p-3 rounded-full text-foreground whitespace-nowrap'>
						{currency.code(price.currency)} {price.amount.toFixed(0)}
					</span>
				</div>

				{/* Color Options */}
				<div className='flex gap-2 mt-auto'>
					{colors.map((color, index) => (
						<motion.button
							key={index}
							className={cn(
								'size-3 sm:size-4 rounded-full ring-2 transition-all',
								selectedColor === index
									? 'ring-foreground ring-offset-1'
									: 'ring-transparent hover:ring-muted-foreground'
							)}
							style={{ backgroundColor: color }}
							onClick={(e) => {
								// Prevent navigation on touch devices when clicking color
								if (!hasHoverCapability) {
									e.preventDefault();
									e.stopPropagation();
								}
								setSelectedColor(index);
							}}
							whileHover={{ scale: 1.15 }}
							whileTap={{ scale: 0.95 }}
						/>
					))}
				</div>
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
			<div className='flex gap-2 mt-auto'>
				<div className='size-3 sm:size-4 rounded-full bg-gray-300'></div>
				<div className='size-3 sm:size-4 rounded-full bg-gray-300'></div>
				<div className='size-3 sm:size-4 rounded-full bg-gray-300'></div>
			</div>
		</div>
	</div>
);

export default ProductCard;
