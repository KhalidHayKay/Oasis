// components/auth/VerifyEmailForm.tsx
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
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import { Input } from '@/components/ui/input';
// import { authService } from '@/services/authService';
import { Loader2, Mail } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';

const verifySchema = z.object({
	code: z.string().length(6, 'Code must be 6 digits'),
});

type VerifyFormValues = z.infer<typeof verifySchema>;

interface VerifyEmailFormProps {
	email: string;
	onSuccess?: () => void;
	onBack?: () => void;
}

export function VerifyEmailForm({
	email,
	onSuccess,
	onBack,
}: VerifyEmailFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [isResending, setIsResending] = useState(false);
	//   const { toast } = useToast();

	const form = useForm<VerifyFormValues>({
		resolver: zodResolver(verifySchema),
		defaultValues: {
			code: '',
		},
	});

	const onSubmit = async (data: VerifyFormValues) => {
		setIsLoading(true);
		// try {
		//   const response = await authService.verifyEmail({
		//     email,
		//     code: data.code,
		//   });
		//   toast({
		//     title: 'Success',
		//     description: response.message || 'Email verified successfully!',
		//   });
		//   onSuccess?.();
		// } catch (error: any) {
		//   toast({
		//     title: 'Error',
		//     description: error.message || 'Verification failed. Please check your code.',
		//     variant: 'destructive',
		//   });
		// } finally {
		//   setIsLoading(false);
		// }
	};

	const handleResendCode = async () => {
		setIsResending(true);
		// try {
		//   const response = await authService.sendVerificationCode(email);
		//   toast({
		//     title: 'Success',
		//     description: response.message || 'Verification code sent!',
		//   });
		// } catch (error: any) {
		//   toast({
		//     title: 'Error',
		//     description: error.message || 'Failed to resend code.',
		//     variant: 'destructive',
		//   });
		// } finally {
		//   setIsResending(false);
		// }
	};

	return (
		<div className='space-y-6 sm:px-20'>
			<div className='space-y-2'>
				<div className='size-[150px] mx-auto mb-4'>
					<img
						src='/images/squircle.png'
						alt='Welcome'
						className='w-full h-full object-contain'
					/>
				</div>
				<h2 className='text-lg font-medium text-foreground'>
					We've sent verification code
				</h2>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='code'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<InputOTP maxLength={6} pattern={''}>
										<InputOTPGroup className='w-full px-1 flex justify-between gap-x-3'>
											<InputOTPSlot
												index={0}
												className='size-10 sm:size-12 focus:ring-brand-800'
											/>
											<InputOTPSlot
												index={1}
												className='size-10 sm:size-12 focus:ring-brand-800'
											/>
											<InputOTPSlot
												index={2}
												className='size-10 sm:size-12 focus:ring-brand-800'
											/>
											<InputOTPSlot
												index={3}
												className='size-10 sm:size-12 focus:ring-brand-800'
											/>
											<InputOTPSlot
												index={4}
												className='size-10 sm:size-12 focus:ring-brand-800'
											/>
											<InputOTPSlot
												index={5}
												className='size-10 sm:size-12 focus:ring-brand-800'
											/>
										</InputOTPGroup>
									</InputOTP>
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
								Verifying...
							</>
						) : (
							'Verify Email'
						)}
					</Button>
				</form>
			</Form>

			<div className='text-center space-y-2'>
				<p className='text-sm text-gray-600'>Didn't receive the code?</p>
				<Button
					type='button'
					variant='ghost'
					onClick={handleResendCode}
					disabled={isResending}
					className='text-brand-700 hover:text-brand-800 h-auto p-0'
				>
					{isResending ? (
						<>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							Sending...
						</>
					) : (
						'Resend code'
					)}
				</Button>
			</div>

			{onBack && (
				<div className='text-center'>
					<Button
						type='button'
						variant='ghost'
						onClick={onBack}
						className='text-gray-600 hover:text-gray-800'
					>
						← Back to login
					</Button>
				</div>
			)}
		</div>
	);
}
