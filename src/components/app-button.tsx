import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface AppButtonProps {
	children: React.ReactNode;
	className?: string; // Optional className for overrides
}

const AppButton: React.FC<AppButtonProps> = ({ children, className }) => {
	return (
		<Button
			className={cn(
				'flex rounded-full bg-brand-800 px-6 py-2 h-10 text-white hover:bg-brand-700 transition-colors cursor-pointer',
				className
			)}
		>
			{children}
		</Button>
	);
};

export default AppButton;
