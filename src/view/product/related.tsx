'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product-card';
import useEmblaCarousel from 'embla-carousel-react';

const Related = ({ products }: { products: Product[] }) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: 'start',
		skipSnaps: false,
		dragFree: false,
		slidesToScroll: 1, // Added slidesToScroll for smooth grouped scrolling - scrolls by 1 slide at a time
	});

	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const onSelect = () => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
		setCanScrollLeft(emblaApi.canScrollPrev());
		setCanScrollRight(emblaApi.canScrollNext());
	};

	useEffect(() => {
		if (!emblaApi) return;
		onSelect();
		emblaApi.on('select', onSelect);
		emblaApi.on('reInit', onSelect);

		return () => {
			emblaApi.off('select', onSelect);
			emblaApi.off('reInit', onSelect);
		};
	}, [emblaApi]);

	const handlePrev = () => emblaApi?.scrollPrev();
	const handleNext = () => emblaApi?.scrollNext();

	const totalSlides = products.length;

	return (
		<section className='spacing-section'>
			{/* Header with Navigation Buttons */}
			<div className='flex items-center justify-between gap-4 mb-8'>
				<h2 className='heading-section'>People also viewed</h2>
				<div className='flex gap-2'>
					<Button
						variant='outline'
						size='icon'
						onClick={handlePrev}
						disabled={!canScrollLeft}
						className='rounded-full bg-transparent'
						aria-label='Scroll carousel left'
					>
						<ChevronLeft className='w-5 h-5' />
					</Button>
					<Button
						variant='outline'
						size='icon'
						onClick={handleNext}
						disabled={!canScrollRight}
						className='rounded-full bg-transparent'
						aria-label='Scroll carousel right'
					>
						<ChevronRight className='w-5 h-5' />
					</Button>
				</div>
			</div>

			{/* Carousel Container */}
			<div className='overflow-hidden' ref={emblaRef}>
				<div className='flex gap-4'>
					{products.map((product) => (
						<div
							key={product.id}
							className='shrink-0 min-w-0 basis-1/2 sm:basis-1/3 lg:basis-1/4'
						>
							{' '}
							{/* Updated responsive breakpoints - 2 items on mobile, 3 on tablet, 4 on desktop */}
							<ProductCard product={product} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Related;
