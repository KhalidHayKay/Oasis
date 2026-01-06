import routes from '@/config/routes';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const Logo = ({ secondary }: { secondary?: boolean }) => {
	return (
		<Link
			href={routes.page.home}
			className={cn(
				'flex items-center gap-2',
				secondary ? 'text-grey-100' : 'text-grey-800'
			)}
		>
			{/* <Sofa className='w-5 h-5 lg:w-6 lg:h-6' /> */}
			<Image src='/logo-alt.png' alt='Logo image' width={28} height={28} />
			<h1 className='text-lg lg:text-xl font-semibold'>Oasis</h1>
		</Link>
	);
};

export default Logo;
