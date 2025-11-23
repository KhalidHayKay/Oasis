import Image from 'next/image';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

const Category = ({ data }) => {
	return (
		<div className='bg-slate-50 px-4 py-16 sm:px-6 lg:px-8'>
			<div className='mx-auto max-w-7xl'>
				<h2 className='mb-12 text-center text-3xl font-bold text-slate-900'>
					Categories
				</h2>

				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
					{data.map((category) => (
						<Card
							key={category.id}
							className='overflow-hidden border-0 bg-white shadow-sm transition-shadow hover:shadow-md'
						>
							<div className='aspect-square overflow-hidden bg-slate-100'>
								<Image
									src={category.image || '/placeholder.svg'}
									alt={category.name}
									width={300}
									height={300}
									className='h-full w-full object-cover'
								/>
							</div>
							<div className='p-6'>
								<h3 className='text-lg font-semibold text-slate-900'>
									{category.name}
								</h3>
								<Button
									variant='outline'
									className='mt-4 w-full border-slate-200 text-slate-700 hover:bg-slate-50 bg-transparent'
								>
									Shop Now →
								</Button>
							</div>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
};

export default Category;
