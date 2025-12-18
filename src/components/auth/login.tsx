'use client';

import { useState } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
// import { authService } from '@/services/authService';
// import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import Social from './social';
// import { useToast } from '@/hooks/use-toast';

const loginSchema = z
	.object({
		name: z.string().min(1, 'Name is required').max(255, 'Name is too long'),
		email: z.email('Invalid email address').max(255, 'Email is too long'),
		password: z.string().min(8, 'Password must be at least 8 characters'),
		password_confirmation: z.string(),
		terms: z.boolean().refine((val) => val === true, {
			message: 'You must accept the terms and conditions',
		}),
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: "Passwords don't match",
		path: ['password_confirmation'],
	});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
	onSuccess?: () => void;
	onSwitchToSignup?: () => void;
	onForgotPassword?: () => void;
}

export function LoginForm({
	onSuccess,
	onSwitchToSignup,
	onForgotPassword,
}: LoginFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	// const { setUser } = useAuth();
	// const { toast } = useToast();

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: LoginFormValues) => {
		// setIsLoading(true);
		// try {
		// 	const response = await authService.register(data);
		// 	setUser(response.user);
		// 	toast({
		// 		title: 'Success',
		// 		description: response.message,
		// 	});
		// 	// Navigate to email verification
		// 	onNeedVerification?.(data.email);
		// } catch (error: any) {
		// 	toast({
		// 		title: 'Error',
		// 		description: error.message || 'Registration failed. Please try again.',
		// 		variant: 'destructive',
		// 	});
		// } finally {
		// 	setIsLoading(false);
		// }
	};

	return (
		<div className='space-y-6 px-10'>
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
						disabled={isLoading}
						className='w-full h-12 bg-brand-700 hover:bg-brand-800 text-white rounded-full'
					>
						{isLoading ? (
							<>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Creating account...
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
