import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import routes from '@/config/routes';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';

const Social = ({ onSuccess }: { onSuccess: () => void }) => {
	const [isLoaging, setIsLoading] = useState(false);

	const setOnSocialAuthSuccess = useAuthStore(
		(state) => state.setOnSocialAuthSuccess,
	);

	const handleSocialLogin = async (provider: 'google' | 'apple') => {
		setOnSocialAuthSuccess(() => {
			setIsLoading(false);
			onSuccess();
			toast.success('Login successful!');
		});

		setIsLoading(true);

		window.open(
			`${process.env.NEXT_PUBLIC_API_BASE}${routes.api.auth.socialLogin(provider)}`,
			'socialAuth',
			'width=500,height=600',
		);
	};

	return (
		<>
			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t border-gray-200' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-white px-2 text-gray-500'>OR</span>
				</div>
			</div>

			<div className='space-y-3'>
				<Button
					type='button'
					variant='outline'
					onClick={() => handleSocialLogin('google')}
					disabled={isLoaging}
					className='w-full h-12 rounded-full border-gray-300'
				>
					{isLoaging ? (
						<Loader2 className='mr-2 h-4 w-4 animate-spin' />
					) : (
						<svg width='18' height='18' viewBox='0 0 48 48'>
							<path
								fill='#EA4335'
								d='M24 9.5c3.54 0 6.7 1.22 9.19 3.6l6.86-6.86C35.95 2.45 30.41 0 24 0 14.82 0 6.73 5.48 2.69 13.44l8 6.21C12.66 13.29 17.87 9.5 24 9.5z'
							/>
							<path
								fill='#4285F4'
								d='M46.1 24.55c0-1.63-.15-3.19-.43-4.7H24v9h12.4c-.53 2.84-2.11 5.24-4.49 6.86l6.91 5.37C43.97 36.68 46.1 31.02 46.1 24.55z'
							/>
							<path
								fill='#FBBC05'
								d='M10.69 28.65a14.4 14.4 0 010-9.3l-8-6.21A23.98 23.98 0 000 24c0 3.86.92 7.51 2.69 10.86l8-6.21z'
							/>
							<path
								fill='#34A853'
								d='M24 48c6.41 0 11.95-2.12 15.93-5.77l-6.91-5.37c-1.92 1.29-4.38 2.05-9.02 2.05-6.13 0-11.34-3.79-13.31-9.15l-8 6.21C6.73 42.52 14.82 48 24 48z'
							/>
						</svg>
					)}
					Continue with Google
				</Button>
			</div>
		</>
	);
};

export default Social;
