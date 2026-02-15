import { User, Package, LogOut } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AuthDrawer } from '@/components/auth/auth-drawer';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';

type AuthView =
	| 'login'
	| 'signup'
	| 'verify-email'
	| 'forgot-password'
	| 'reset-password';

interface AppUserProps {
	isAuthenticated: boolean;
	user: User | null;
	isAuthDrawerOpen: boolean;
	setIsAuthDrawerOpen: (open: boolean) => void;
	authView: AuthView;
	setAuthView: (view: AuthView) => void;
	onAuthSuccess: () => void;
}

export default function AppUser({
	isAuthenticated,
	user,
	isAuthDrawerOpen,
	setIsAuthDrawerOpen,
	authView,
	setAuthView,
	onAuthSuccess,
}: AppUserProps) {
	const logout = useAuthStore((state) => state.logout);

	const openDrawer = (view: AuthView) => {
		setAuthView(view);
		setIsAuthDrawerOpen(true);
	};

	const handleAuthSuccess = () => {
		setIsAuthDrawerOpen(false);
		setTimeout(() => setAuthView('login'), 300);
		onAuthSuccess();
	};

	const handleLogout = async () => {
		// const isSure = window.confirm("Click OK if you're sure you want to logout");

		// if (!isSure) return;

		try {
			const message = await logout();

			toast(message || 'Logout successful');
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Failed to logout.';
			toast.error(message);
		}
	};

	return (
		<>
			{isAuthenticated ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button className='relative rounded-full focus:outline-none focus:ring-2 focus:ring-grey-300 focus:ring-offset-2'>
							<Avatar className='w-8 h-8 border border-grey-200 cursor-pointer hover:border-grey-400 transition-colors'>
								{user?.avatar && user.avatar !== '' ? (
									<Image
										src={user.avatar}
										alt={user?.name || 'User avatar'}
										width={32}
										height={32}
									/>
								) : (
									<AvatarFallback className='bg-grey-100 text-grey-600 text-xs'>
										{user?.name?.charAt(0).toUpperCase()}
									</AvatarFallback>
								)}
							</Avatar>
							{!user?.emailVerified && (
								<span
									className='absolute top-0 right-0 h-2 w-2 bg-orange-500 rounded-full border-2 border-white'
									title='Email not verified'
								/>
							)}
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' className='w-56'>
						<DropdownMenuLabel>
							<div className='flex flex-col space-y-1'>
								<p className='text-sm font-medium text-grey-900'>{user?.name}</p>
								<p className='text-xs text-grey-500'>
									{user?.emailVerified ? user.email : 'Email not verified'}
								</p>
							</div>
						</DropdownMenuLabel>

						{!user?.emailVerified && (
							<>
								<DropdownMenuSeparator />
								<div className='px-2 py-1.5'>
									<Button
										size='sm'
										onClick={(e) => {
											openDrawer('verify-email');
											e.currentTarget.blur();
										}}
										className='w-full bg-orange-600 hover:bg-orange-700 text-white'
									>
										Verify Email
									</Button>
								</div>
							</>
						)}

						{user?.emailVerified && (
							<>
								<DropdownMenuSeparator />
								<DropdownMenuItem className='cursor-pointer p-0'>
									<Link href='/orders' className='w-full flex items-center gap-4 p-2'>
										<Package className='size-4' />
										<span>My Orders</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem className='cursor-pointer p-0'>
									<Link href='/account' className='w-full flex items-center gap-4 p-2'>
										<User className='size-4' />
										<span>My Account</span>
									</Link>
								</DropdownMenuItem>
							</>
						)}

						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button
										variant='ghost'
										className='px-0! size-full justify-start cursor-pointer text-red-600 focus:text-red-600'
										onClick={(e) => {
											e.stopPropagation();
										}}
									>
										<LogOut className='mr-2 h-4 w-4' />
										<span>Log Out</span>
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
										<AlertDialogDescription>
											This will log you out of your account on this device. You can log
											back in anytime.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction
											variant='destructive'
											className='bg-brandRed/50'
											onClick={handleLogout}
										>
											Logout
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<Button
					size='sm'
					onClick={(e) => {
						openDrawer('login');
						e.currentTarget.blur();
					}}
					className='bg-brand-800 text-white hover:bg-brand-700 rounded-full focus-visible::bg-red-500'
				>
					Get Started
				</Button>
			)}

			{/* AuthDrawer controlled by Header state */}
			<AuthDrawer
				open={isAuthDrawerOpen}
				onOpenChange={setIsAuthDrawerOpen}
				defaultView={authView}
				onSuccess={handleAuthSuccess}
				userEmail={user?.email}
			/>
		</>
	);
}
