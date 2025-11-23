import Image from 'next/image';

const Hero = () => {
	return (
		<div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
			<div className='text-center'>
				<p className='text-xs font-semibold uppercase tracking-widest text-slate-500'>
					Furniture Store
				</p>
				<h1 className='text-balance mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl'>
					Discover the Artistry of Modern Contemporary Furniture
				</h1>
				<p className='text-balance mx-auto mt-6 max-w-2xl text-lg text-slate-600'>
					Experience the elegance and functionality of cutting-edge design where
					luxury meets innovation in every piece for ultimate relaxation
				</p>
			</div>

			<div className='mt-12'>
				<Image
					src='/images/hero.png'
					alt='Modern gray sofa with wooden base'
					width={600}
					height={400}
					className='mx-auto h-auto w-full max-w-3xl rounded-lg object-cover'
					priority
				/>
			</div>
		</div>
	);
};

export default Hero;
