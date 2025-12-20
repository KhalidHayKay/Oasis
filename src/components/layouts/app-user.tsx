import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, Package, Settings, User } from 'lucide-react';
import { Button } from '../ui/button';
import { AuthDrawer } from '../auth/auth-drawer';
import { useAuthStore } from '@/store/useAuthStore';

export default function AppUser({
	isAuthenticated,
	user,
}: {
	isAuthenticated: boolean;
	user: User | null;
}) {
	const logout = useAuthStore((state) => state.logout);

	return (
		<>
			{isAuthenticated ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button className='rounded-full focus:outline-none focus:ring-2 focus:ring-grey-300 focus:ring-offset-2'>
							<Avatar className='w-8 h-8 border border-grey-200 cursor-pointer hover:border-grey-400 transition-colors'>
								<AvatarImage src={user?.avatar} alt={user?.name} />
								<AvatarFallback className='bg-grey-100 text-grey-600 text-xs'>
									{user?.name?.charAt(0)}
								</AvatarFallback>
							</Avatar>
							{!user?.emailVerified && (
								<span className='absolute -top-1 -right-1 h-2 w-2 bg-orange-500 rounded-full' />
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
								<DropdownMenuItem
									onClick={() => console.log('Hello')}
									className='text-orange-600'
								>
									<AuthDrawer
										trigger={
											<Button
												size='sm'
												// className='bg-brand-800 text-white hover:bg-brand-700 rounded-full'
											>
												Verify Email
											</Button>
										}
										defaultView='verify-email'
									/>
								</DropdownMenuItem>
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
							onClick={logout}
							className='cursor-pointer text-red-600 focus:text-red-600'
						>
							<LogOut className='mr-2 h-4 w-4' />
							<span>Log Out</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<AuthDrawer
					trigger={
						<Button
							size='sm'
							className='bg-brand-800 text-white hover:bg-brand-700 rounded-full'
						>
							Get Started
						</Button>
					}
					defaultView='login'
				/>
			)}
		</>
	);
}
