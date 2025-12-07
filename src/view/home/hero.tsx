import Image from 'next/image';

const Hero = () => {
	return (
		<section className='pt-5 sm:pt-10 lg:pt-16'>
			<div className='text-center'>
				<p className='text-sm sm:text-xl font-bold uppercase tracking-widest text-primary/80'>
					Furniture Store
				</p>
				<h1 className='text-balance mt-5 tracking-tight text-slate-900 text-3xl sm:text-5xl md:text-6xl font-semibold md:font-bold lg:max-w-5xl mx-auto'>
					Discover the Artistry of Modern Contemporary Furniture
				</h1>
				<p className='mx-auto mt-6 max-w-5xl text-lg sm:text-xl text-slate-600'>
					Experience the elegance and functionality of cutting-edge design where
					luxury meets innovation in every piece for ultimate relaxation
				</p>
			</div>

			<div className='mt-6 sm:mt-12'>
				<Image
					src='/images/hero.jpg'
					alt='Modern gray sofa with wooden base'
					width={1200}
					height={750}
					className='mx-auto sm:max-h-[400px] lg:max-h-[500px] h-auto w-full rounded-md object-cover'
					priority
				/>
			</div>
		</section>
	);
};

export default Hero;
