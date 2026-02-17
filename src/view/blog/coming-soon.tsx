import { BookOpen, Bell } from 'lucide-react';
import Link from 'next/link';

const ComingSoon = () => {
	return (
		<div className='min-h-screen bg-linear-to-b from-white to-grey-50 py-20 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-2xl mx-auto text-center'>
				{/* Icon */}
				<div className='relative inline-block mb-8'>
					<div className='absolute inset-0 bg-linear-to-br from-blue-400 to-purple-400 rounded-full blur-2xl opacity-20'></div>
					<div className='relative bg-white rounded-full p-6 shadow-lg border border-grey-100'>
						<BookOpen className='w-12 h-12 text-grey-800' />
					</div>
					{/* <Sparkles className='absolute -top-2 -right-2 w-6 h-6 text-purple-400' /> */}
				</div>

				{/* Heading */}
				<h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-grey-900 mb-4'>
					Our Blog is
					<span className='block bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
						Coming Soon
					</span>
				</h1>

				{/* Description */}
				<p className='text-lg text-grey-600 mb-8 max-w-md mx-auto leading-relaxed'>
					We&apos;re crafting something special for you. Expect design tips,
					furniture guides, and stories that inspire beautiful living spaces.
				</p>

				{/* Notify Button */}
				<div className='flex flex-col sm:flex-row items-center justify-center gap-4 mb-12'>
					<button className='group flex items-center gap-2 px-6 py-3 bg-grey-900 text-white rounded-full font-medium hover:bg-grey-800 transition-all hover:scale-105 shadow-lg'>
						<Bell className='w-4 h-4 group-hover:animate-wiggle' />
						Notify Me When It Launches
					</button>
					<Link
						href='/'
						className='px-6 py-3 text-grey-700 font-medium hover:text-grey-900 transition-colors'
					>
						Back to Home
					</Link>
				</div>

				{/* Features Preview */}
				<div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16'>
					<div className='bg-white rounded-2xl p-6 shadow-sm border border-grey-100 hover:shadow-md transition-shadow'>
						<div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3 mx-auto'>
							<span className='text-2xl'>✨</span>
						</div>
						<h3 className='font-semibold text-grey-900 mb-2'>Design Tips</h3>
						<p className='text-sm text-grey-600'>
							Expert advice on styling your space
						</p>
					</div>

					<div className='bg-white rounded-2xl p-6 shadow-sm border border-grey-100 hover:shadow-md transition-shadow'>
						<div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3 mx-auto'>
							<span className='text-2xl'>🛋️</span>
						</div>
						<h3 className='font-semibold text-grey-900 mb-2'>Product Stories</h3>
						<p className='text-sm text-grey-600'>
							Behind the scenes of our collection
						</p>
					</div>

					<div className='bg-white rounded-2xl p-6 shadow-sm border border-grey-100 hover:shadow-md transition-shadow'>
						<div className='w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mb-3 mx-auto'>
							<span className='text-2xl'>💡</span>
						</div>
						<h3 className='font-semibold text-grey-900 mb-2'>Inspiration</h3>
						<p className='text-sm text-grey-600'>Real homes, real transformations</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ComingSoon;
