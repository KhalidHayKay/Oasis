'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import Social from './social';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';

const loginSchema = z.object({
	email: z.email('Invalid email address').max(255, 'Email is too long'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
	onSuccess: () => void;
	onSwitchToSignup?: () => void;
	onForgotPassword?: () => void;
}

export function LoginForm({
	onSuccess,
	onSwitchToSignup,
	onForgotPassword,
}: LoginFormProps) {
	const login = useAuthStore((state) => state.login);

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (credentials: LoginFormValues) => {
		try {
			const res = await login(credentials);
			toast.success(res.message || 'Login successful');
			onSuccess();
		} catch (error: any) {
			toast.error(error.message || 'Registration failed. Please try again.');
		}
	};

	return (
		<div className='space-y-6 sm:px-10'>
			<div className='space-y-2'>
				<div className='size-[150px] mx-auto mb-4'>
					<img
						src='/images/cat/accessories.png'
						alt='Welcome'
						className='w-full h-full object-contain'
					/>
				</div>
				<h2 className='text-lg font-medium text-foreground'>Welcome back</h2>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder='hello@example.com'
										type='email'
										{...field}
										className='h-12 rounded-xl border-gray-200'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder='Password'
										type='password'
										{...field}
										className='h-12 rounded-xl border-gray-200'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<p className='text-sm text-right text-gray-600 w-full'>
						<span
							className='text-brand-700 hover:underline'
							onClick={onForgotPassword}
						>
							Forgot password?
						</span>
					</p>

					<Button
						type='submit'
						disabled={form.formState.isSubmitting}
						className='w-full h-12 bg-brand-700 hover:bg-brand-800 text-white rounded-full'
					>
						{form.formState.isSubmitting ? (
							<>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Logging in...
							</>
						) : (
							'Login'
						)}
					</Button>
				</form>
			</Form>

			<Social />

			<div className='text-center text-sm text-gray-600'>
				First time here?{' '}
				<button
					type='button'
					onClick={onSwitchToSignup}
					className='text-brand-700 hover:text-brand-800 font-medium'
				>
					Create an account
				</button>
			</div>
		</div>
	);
}
