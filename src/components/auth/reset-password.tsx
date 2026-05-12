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
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Loader2, CheckCircle } from 'lucide-react';
import { authService } from '@/services/authService';
import { toast } from 'sonner';

const resetPasswordSchema = z
	.object({
		token: z.string().length(6, 'Code must be 6 digits'),
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
	onSuccess?: () => void;
	onReRequest?: () => void;
}

export function ResetPasswordForm({
	email,
	onSuccess,
	onReRequest
}: ResetPasswordFormProps) {
	const form = useForm<ResetPasswordFormValues>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			token: '',
			password: '',
			password_confirmation: '',
		},
	});

	const onSubmit = async (data: ResetPasswordFormValues) => {
		try {
			const response = await authService.resetPassword({
				email,
				...data,
			});
			toast.success(response.message || 'Password reset successfully!')
			onSuccess?.();
		} catch (error: any) {
			toast.error(error.message || 'Failed to reset password. Please try again.')
		}
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

					<FormField
						control={form.control}
						name='token'
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor='otp' className='text-gray-500 mt-5 ml-1'>Enter OTP</FormLabel>
								<FormControl>
									<InputOTP
										maxLength={6}
										pattern={REGEXP_ONLY_DIGITS}
										value={field.value}
										onChange={field.onChange}
									>
										<InputOTPGroup className='w-full px-1 flex justify-between gap-x-3'>
											{Array.from({ length: 6 }).map((_, i) => (
												<InputOTPSlot
													key={i}
													index={i}
													className='size-10 sm:size-12 focus:ring-brand-800'
												/>
											))}
										</InputOTPGroup>
									</InputOTP>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type='submit'
						disabled={form.formState.isSubmitting}
						className='w-full h-12 mt-5 bg-brand-700 hover:bg-brand-800 text-white rounded-full'
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
				Unable to reset password?{' '}
				<button
					type='button'
					onClick={onReRequest}
					className='text-brand-700 hover:text-brand-800 font-medium'
				>
					Request a new OTP
				</button>
			</div>
		</div>
	);
}
