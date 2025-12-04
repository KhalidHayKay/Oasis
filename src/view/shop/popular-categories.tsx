'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';
import CategoryCard from '@/components/category-card';

const PopularCategories = ({ categories }: { categories: Category[] }) => {
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

	const totalSlides = categories.length;

	return (
		<section className='spacing-section'>
			{/* Header with Navigation Buttons */}
			<div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-8'>
				<h2 className='heading-section text-xl sm:text-3xl!'>
					View our Most Popular Categories
				</h2>
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
					{categories.map((category) => (
						<div
							key={category.id}
							className='max-h-[250px] sm:max-h-[300px] shrink-0 min-w-0 basis-1/1 lg:basis-1/2'
						>
							<CategoryCard category={category} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default PopularCategories;
