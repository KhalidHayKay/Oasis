import Image from 'next/image';
import { useState } from 'react';

const Imagery = ({ images }: { images: ProductImage[] }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	return (
		<div className='flex-1 flex flex-col gap-4'>
			<div className='relative bg-muted rounded-lg overflow-hidden aspect-square flex items-center justify-center'>
				<Image
					src={images[currentImageIndex].src || '/placeholder.svg'}
					alt={`Product - view ${currentImageIndex + 1}`}
					fill
					className='object-cover'
					priority
				/>
			</div>

			{images.length > 1 && (
				<div className='flex gap-3'>
					{images.map((image, index) => (
						<button
							key={index}
							onClick={() => setCurrentImageIndex(index)}
							className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
								index === currentImageIndex ? 'border-primary' : 'border-border'
							}`}
						>
							<Image
								src={image.src || '/placeholder.svg'}
								alt={`Thumbnail ${index + 1}`}
								fill
								className='object-cover'
							/>
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default Imagery;
