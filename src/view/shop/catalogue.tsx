import ProductCard, {
	ProductCardSkeleton,
} from '@/components/product/product-card';
import { AnimatePresence, motion } from 'motion/react';

const Catalogue = ({
	products,
	isPending,
}: {
	products: Product[];
	isPending?: boolean;
}) => {
	return (
		<div className='min-h-[400px]'>
			<AnimatePresence mode='wait' initial={false}>
				{isPending ? (
					<motion.div
						key='loading'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6'
					>
						{Array.from({ length: 9 }).map((_, i) => (
							<ProductCardSkeleton key={`skeleton-${i}`} />
						))}
					</motion.div>
				) : products.length === 0 ? (
					<motion.div
						key='empty'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
						className='flex flex-col items-center justify-center py-16 text-center'
					>
						<div className='w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4'>
							<svg
								className='w-8 h-8 text-gray-400'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
								/>
							</svg>
						</div>
						<h3 className='text-lg font-semibold text-gray-900 mb-2'>
							No products found
						</h3>
						<p className='text-sm text-gray-600 max-w-sm'>
							Try adjusting your filters or search query to find what you&apos;re
							looking for.
						</p>
					</motion.div>
				) : (
					<motion.div
						key='products'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6'
					>
						{products.map((product, index) => (
							<motion.div
								key={product.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.3,
									delay: Math.min(index * 0.05, 0.3),
									ease: [0.25, 0.1, 0.25, 1],
								}}
							>
								<ProductCard
									product={product}
									className='h-full min-h-[200px] sm:min-h-[320px] lg:min-h-[400px]'
								/>
							</motion.div>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Catalogue;
