import { Card } from '@/components/ui/card';
import { ChevronRight, MoveUpRight } from 'lucide-react';
import Image from 'next/image';
import routes from '@/config/routes';
import Link from 'next/link';

const CategoryCard = ({ category }: { category: Category }) => {
	return (
		<Card className='flex-row gap-0 py-0 overflow-hidden group hover:shadow-sm transition-shadow duration-300 h-full'>
			{/* Content */}
			<div className='w-3/5 py-2.5 sm:py-5 px-4 lg:py-10 lg:px-6 flex flex-col items-start justify-center md:justify-between lg:justify-center gap-y-3'>
				<div className='flex flex-col items-start justify-center sm:justify-between gap-y-1'>
					{/* Product Count Badge */}
					<div className='inline-block bg-primary/10 text-primary text-[8px] sm:text-xs font-medium px-3 py-1 rounded-full sm:mb-3'>
						{category.productCount} products
					</div>
					<h2 className='text-2xl sm:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors'>
						{category.name}
					</h2>
				</div>

				<p className='text-xs sm:text-sm text-muted-foreground'>
					{category.description}
				</p>

				<Link
					key={category.id}
					href={routes.page.categories.view(category.slug)}
					className='flex items-center gap-x-2 sm:gap-x-4 w-fit py-2 px-3 lg:px-5 border-2 border-grey-800 rounded-full text-grey-800 text-xs sm:text-sm font-semibold'
				>
					<span>Explore Products</span>
					<MoveUpRight className='size-3 font-bold' />
				</Link>
			</div>

			{/* Image Container */}
			<div className='w-2/5 relative h-full overflow-hidden bg-muted'>
				<Image
					width={1200}
					height={800}
					src={category.image || '/placeholder.svg'}
					alt={category.name}
					className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
				/>
				{/* Overlay */}
				<div className='absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300' />
			</div>
		</Card>
	);
};

export default CategoryCard;
