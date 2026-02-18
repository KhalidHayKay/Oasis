import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface AppDrawerProps {
	trigger?: ReactNode;
	title: string;
	children: ReactNode;
	footerButton?: {
		label: string;
		onClick: () => void;
		loading?: boolean;
		className?: string;
	};
	onTriggerClick?: () => void;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	onClose?: () => void;
}

export function AppDrawer({
	trigger,
	title,
	children,
	footerButton,
	onTriggerClick,
	open,
	onOpenChange,
	onClose,
}: AppDrawerProps) {
	return (
		<Drawer direction='right' open={open} onOpenChange={onOpenChange}>
			<DrawerTrigger asChild onClick={onTriggerClick}>
				{trigger}
			</DrawerTrigger>
			<DrawerContent
				aria-describedby={undefined}
				className='min-w-full md:min-w-3/4 lg:min-w-1/2 h-dvh flex flex-col'
			>
				<DrawerClose onClick={onClose} className='w-fit absolute top-7 left-5'>
					<div className='size-8 flex items-center justify-center rounded-full bg-grey-200/20 hover:bg-grey-200/50'>
						<X className='text-foreground size-4' />
					</div>
				</DrawerClose>

				<div className='py-5 px-5 sm:px-15 xl:px-30 w-full flex flex-col flex-1 min-h-0'>
					<DrawerHeader className='flex-row justify-center'>
						<DrawerTitle className='text-2xl font-semibold'>{title}</DrawerTitle>
					</DrawerHeader>

					<div className='mt-10 flex-1 overflow-y-auto scrollbar-hide min-h-0'>
						<div className='pt-2 flex flex-col gap-y-10'>{children}</div>
					</div>
				</div>

				{footerButton && (
					<DrawerFooter className='p-0'>
						<Button
							disabled={footerButton.loading}
							className={
								footerButton.className ||
								'size-full bg-brand-700 hover:bg-brand-800 rounded-none py-4'
							}
							onClick={footerButton.onClick}
						>
							{footerButton.label}
						</Button>
					</DrawerFooter>
				)}
			</DrawerContent>
		</Drawer>
	);
}
