// components/auth/ResetPasswordForm.tsx
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
// import { authService } from '@/services/authService';
import { Loader2, CheckCircle } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';

const resetPasswordSchema = z
	.object({
		password: z.string().min(8, 'Password must be at least 8 characters'),
		password_confirmation: z.string(),
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: "Passwords don't match",
		path: ['password_confirmation'],
	});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
	email: string;
	token: string;
	onSuccess?: () => void;
}

export function ResetPasswordForm({
	email,
	token,
	onSuccess,
}: ResetPasswordFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	// const { toast } = useToast();

	const form = useForm<ResetPasswordFormValues>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: '',
			password_confirmation: '',
		},
	});

	const onSubmit = async (data: ResetPasswordFormValues) => {
		// setIsLoading(true);
		// try {
		// 	const response = await authService.resetPassword({
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
		<div className='space-y-6'>
			<div className='text-center space-y-2'>
				<div className='w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-brand-50 rounded-full'>
					<CheckCircle className='w-12 h-12 text-brand-700' />
				</div>
				<h2 className='text-xl font-semibold'>Create new password</h2>
				<p className='text-sm text-gray-600'>
					Your new password must be different from previously used passwords.
				</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder='New Password'
										type='password'
										{...field}
										className='h-12 rounded-full border-gray-200'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password_confirmation'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder='Confirm New Password'
										type='password'
										{...field}
										className='h-12 rounded-full border-gray-200'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type='submit'
						disabled={isLoading}
						className='w-full h-12 bg-brand-700 hover:bg-brand-800 text-white rounded-full'
					>
						{isLoading ? (
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
		</div>
	);
}
