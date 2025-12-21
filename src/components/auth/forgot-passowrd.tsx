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
import Image from 'next/image';
const forgotPasswordSchema = z.object({
	email: z.email('Invalid email address').max(255, 'Email is too long'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
	onSuccess: (userEmail: string, token: string) => void;
	onBack?: () => void;
}

export function ForgotPasswordForm({
	onSuccess,
	onBack,
}: ForgotPasswordFormProps) {
	const form = useForm<ForgotPasswordFormValues>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = async (data: ForgotPasswordFormValues) => {
		console.log(data);
		onSuccess(data.email, '');
		// setIsLoading(true);
		// try {
		// 	const response = await authService.forgotPassword({
		// 		email,
		// 		token,
		// 		...data,
		// 	});
		// 	toast({
		// 		title: 'Success',
		// 		description: response.message || 'Password reset successfully!',
		// 	});
		// 	onSuccess?.();
		// } catch (error: any) {
		// 	toast({
		// 		title: 'Error',
		// 		description: error.message || 'Failed to reset password. Please try again.',
		// 		variant: 'destructive',
		// 	});
		// } finally {
		// 	setIsLoading(false);
		// }
	};

	return (
		<div className='space-y-6 sm:px-10'>
			<div className='space-y-2'>
				<div className='size-[150px] mx-auto mb-4'>
					<Image
						width={400}
						height={250}
						src='/images/squircle.png'
						alt='Welcome'
						className='w-full h-full object-contain'
					/>
				</div>
				<h2 className='text-lg font-medium text-foreground'>
					Enter your email and we&apos;ll send a password reset OTP
				</h2>
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

					<Button
						type='submit'
						disabled={form.formState.isSubmitting}
						className='w-full h-12 bg-brand-700 hover:bg-brand-800 text-white rounded-full'
					>
						{form.formState.isSubmitting ? (
							<>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Resetting...
							</>
						) : (
							'Reset Password'
						)}
					</Button>
				</form>
			</Form>
			<div className='text-center text-sm text-gray-600'>
				Remebered your password?{' '}
				<button
					type='button'
					onClick={onBack}
					className='text-brand-700 hover:text-brand-800 font-medium'
				>
					Back to login
				</button>
			</div>
		</div>
	);
}
