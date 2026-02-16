'use client';

import HorizontalScrollablePill from '@/components/horizontal-scrollable-pills';
import InspoItem, { InspoItemSkeleton } from '@/components/inspo-item';
import { Button } from '@/components/ui/button';
import { useInspirations } from '@/hooks/useInspirations';
import { useState } from 'react';

const Inspiration = ({ inspirations }: { inspirations: Inspiration[] }) => {
	const [activeCategory, setActiveCategory] = useState('All');

	const categories = [
		'All',
		'Bedroom',
		'Living room',
		'Kitchen',
		'Workspace',
		'Outdoor',
		'Bathroom',
		'Home office',
		'Dining',
	];

	// Filter inspirations by category
	const filteredInspirations =
		activeCategory === 'All'
			? inspirations
			: inspirations.filter((item) => item.category === activeCategory);

	const { displayedInspirations, handleShowMore, hasMore, handleCollapse } =
		useInspirations(filteredInspirations);

	return (
		<section className='spacing-section'>
			<div className='space-y-5 mb-8'>
				<h2 className='heading-section'>
					Design inspiration and modern home ideas
				</h2>

				<HorizontalScrollablePill
					categories={categories}
					active={{ set: setActiveCategory, value: activeCategory }}
				/>
			</div>

			<div className='space-y-8'>
				{!displayedInspirations.length ? (
					<InspoItemSkeleton />
				) : (
					<div className='columns-2 sm:columns-3 gap-6'>
						{displayedInspirations.map((item) => (
							<div key={item.id} className='mb-6 break-inside-avoid'>
								<InspoItem inspo={item} />
							</div>
						))}
					</div>
				)}
				{/* Show More Section */}
				{filteredInspirations.length > 0 && (
					<div className='flex flex-col items-center gap-6'>
						<p className='text-xs sm:text-sm text-muted-foreground'>
							Showing {displayedInspirations.length} of {filteredInspirations.length}{' '}
							results
						</p>

						<div
							className='relative w-[200px] sm:w-[400px] h-0.5 bg-grey-300 before:absolute before:left-0 before:top-0 before:w-(--progress) before:h-full before:bg-accent-foreground delay-200 before:transition-all before:duration-300'
							style={
								{
									'--progress': `${
										(displayedInspirations.length / filteredInspirations.length) * 100
									}%`,
								} as React.CSSProperties
							}
						/>

						<Button
							onClick={hasMore ? handleShowMore : handleCollapse}
							variant='outline'
							className='rounded-full py-5 px-5 sm:py-7 sm:px-10 text-base font-semibold bg-transparent border-grey-500 cursor-pointer'
						>
							{hasMore ? 'Show more' : 'Collapse'}
						</Button>
					</div>
				)}
			</div>
		</section>
	);
};

export default Inspiration;
