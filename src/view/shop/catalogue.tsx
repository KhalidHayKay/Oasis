import ProductCard, {
	ProductCardSkeleton,
} from '@/components/product/product-card';
import { AnimatePresence, motion } from 'motion/react';

const Catalogue = ({ products }: { products: Product[] }) => {
	return (
		<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-y-5 gap-x-2 sm:gap-x-5 sm:gap-y-5 lg:gap-x-6 lg:gap-y-10 mb-6 sm:mb-12'>
			<AnimatePresence mode='popLayout'>
				{!products.length
					? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
					: products.map((product) => (
							<motion.div
								key={product.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{
									duration: 0.4,
									ease: 'easeOut',
								}}
							>
								<ProductCard
									product={product}
									className='min-h-[150px] sm:min-h-[300px] md:min-h-[400px]'
								/>
							</motion.div>
					  ))}
			</AnimatePresence>
		</div>
	);
};

export default Catalogue;
