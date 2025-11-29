import Image from 'next/image';
import { Card } from '../../components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type CategoryType = {
	id: number;
	title: string;
	image: string;
	href: string;
	isDoubleCol: boolean;
};

const Category = ({ categories }: { categories: CategoryType[] }) => {
	return (
		<section className='spacing-section'>
			<h2 className='heading-section mb-5'>Categories</h2>

			<div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
				{categories.map((c) => {
					const isSittingRoom = c.title === 'Sitting Room';

					return (
						<Card
							key={c.id}
							className={cn(
								'relative h-[200px] sm:h-[400px] p-3 rounded-sm bg-brand-50 shadow-none border-0 overflow-hidden',
								'flex flex-row sm:flex-row items-center justify-between sm:justify-around',
								c.isDoubleCol ? 'col-span-1 sm:col-span-2' : 'col-span-1',
								!c.isDoubleCol &&
									'flex-row sm:flex-col-reverse lg:flex-row items-center sm:p-10'
							)}
						>
							<div
								className={cn(
									c.isDoubleCol ? 'self-center' : 'self-center lg:self-end'
								)}
							>
								<h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold'>
									{c.title}
								</h2>
								<Link href={c.href}>
									<Button className='mt-4 p-2 sm:p-6 text-sm sm:text-base lg:text-lg inline-flex items-center gap-0.5 sm:gap-2 rounded-full bg-transparent hover:bg-brand-100 font-semibold text-primary border border-primary hover:border-primary/70 cursor-pointer transition-colors'>
										Shop Now <ArrowRight />
									</Button>
								</Link>
							</div>

							<div className={cn(isSittingRoom && '-mr-[15%]')}>
								<Image
									src={c.image}
									alt={c.title}
									width={600}
									height={400}
									className={cn(
										'object-contain',
										c.isDoubleCol
											? 'w-[150px] sm:w-[250px] md:w-[400px]'
											: 'w-[150px] lg:w-[400px]',
										isSittingRoom && 'w-[300px] sm:w-[400px] md:w-[550px] lg:w-[700px]'
									)}
								/>
							</div>
						</Card>
					);
				})}
			</div>
		</section>
	);
};

export default Category;
