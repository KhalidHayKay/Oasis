import Crumb from '@/components/crumb';
import { Input } from '@/components/ui/input';
import routes from '@/config/routes';
import { Search } from 'lucide-react';

const Hero = ({ category, desc }: { category: string; desc: string }) => {
	const links = [
		{
			href: routes.page.home,
			title: 'Home',
		},
		{
			href: routes.page.categories.all,
			title: 'Categories',
		},
	];

	return (
		<div className='text-center flex flex-col items-center'>
			<h1 className='text-balance mt-5 tracking-tight text-slate-900 text-3xl sm:text-4xl md:text-5xl font-semibold lg:max-w-5xl mx-auto'>
				{category}
			</h1>
			<p className='my-6 text-lg sm:text-lg text-slate-600'>{desc}</p>
			<Crumb links={links} page={category} />
			<div className='w-3/4 max-w-3xl relative'>
				<Input
					className='w-full py-6 pl-5 pr-15 rounded-3xl'
					placeholder='Search by name or tag...'
				/>
				<Search className='size-5 absolute right-6 top-1/2 -translate-y-1/2 text-grey-400 cursor-pointer' />
			</div>
		</div>
	);
};

export default Hero;
