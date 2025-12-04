'use client';

import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product/product-card';
import useEmblaCarousel from 'embla-carousel-react';

const RelatedProductCatalogue = ({ products }: { products: Product[] }) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: 'start',
		skipSnaps: false,
		dragFree: false,
		slidesToScroll: 1,
	});

	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setCanScrollLeft(emblaApi.canScrollPrev());
		setCanScrollRight(emblaApi.canScrollNext());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;

		queueMicrotask(onSelect);

		// Subscribe to events
		emblaApi.on('select', onSelect);
		emblaApi.on('reInit', onSelect);

		return () => {
			emblaApi.off('select', onSelect);
			emblaApi.off('reInit', onSelect);
		};
	}, [emblaApi, onSelect]);

	const handlePrev = () => emblaApi?.scrollPrev();
	const handleNext = () => emblaApi?.scrollNext();

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
			<div className='overflow-hidden p-1' ref={emblaRef}>
				<div className='h-fit flex gap-4'>
					{products.map((product) => (
						<div
							key={product.id}
							className='h-fit shrink-0 min-w-0 basis-1/2 sm:basis-1/3 lg:basis-1/4'
						>
							<ProductCard
								product={product}
								className='min-h-[150px] sm:min-h-[300px] md:min-h-[450px]'
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default RelatedProductCatalogue;
