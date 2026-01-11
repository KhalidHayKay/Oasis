import { User, Package, Settings, LogOut } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AuthDrawer } from '@/components/auth/auth-drawer';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';

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
		const isSure = window.confirm("Click OK if you're sure you want to logout");

		if (!isSure) return;

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
								<AvatarImage src={user?.avatar} alt={user?.name} />
								<AvatarFallback className='bg-grey-100 text-grey-600 text-xs'>
									{user?.name?.charAt(0).toUpperCase()}
								</AvatarFallback>
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
								<DropdownMenuItem className='cursor-pointer'>
									<User className='mr-2 h-4 w-4' />
									<span>My Account</span>
								</DropdownMenuItem>
								<DropdownMenuItem className='cursor-pointer'>
									<Package className='mr-2 h-4 w-4' />
									<span>My Orders</span>
								</DropdownMenuItem>
								<DropdownMenuItem className='cursor-pointer'>
									<Settings className='mr-2 h-4 w-4' />
									<span>Settings</span>
								</DropdownMenuItem>
							</>
						)}

						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={handleLogout}
							className='cursor-pointer text-red-600 focus:text-red-600'
						>
							<LogOut className='mr-2 h-4 w-4' />
							<span>Log Out</span>
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
