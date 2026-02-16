import Image from 'next/image';

const InspoItem = ({ inspo }: { inspo: Inspiration }) => {
	const getHeightClass = (height: string) => {
		switch (height) {
			case 'short':
				return 'h-64';
			case 'medium':
				return 'h-80';
			case 'tall':
				return 'h-96';
			default:
				return 'h-80';
		}
	};

	return (
		<div key={inspo.id} className='break-inside-avoid mb-6'>
			<div className='group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-100'>
				<div className={`overflow-hidden ${getHeightClass(inspo.height)}`}>
					<Image
						src={inspo.imageUrl}
						alt={inspo.title || inspo.category}
						width={800}
						height={1200}
						className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
						loading='lazy'
					/>
				</div>

				{/* Always visible on touch, hover-activated on pointer devices */}
				<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 transition-opacity duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100'>
					<div className='absolute bottom-0 left-0 right-0 p-4 text-white'>
						<p className='text-sm font-medium'>{inspo.category}</p>
						{inspo.title && (
							<p className='text-xs mt-1 text-gray-200'>{inspo.title}</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export const InspoItemSkeleton = () => (
	<div className='columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6'>
		{[...Array(6)].map((_, i) => (
			<div key={i} className='animate-pulse break-inside-avoid'>
				<div
					className={`bg-gray-200 rounded-lg w-full ${
						i % 3 === 0 ? 'h-96' : i % 2 === 0 ? 'h-64' : 'h-80'
					}`}
				></div>
			</div>
		))}
	</div>
);

export default InspoItem;
