'use client';

import { useEffect, useRef, useState } from 'react';
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
	InputOTPSlot,
} from '@/components/ui/input-otp';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { authService } from '@/services/authService';

const verifySchema = z.object({
	code: z.string().length(6, 'Code must be 6 digits'),
});

type VerifyFormValues = z.infer<typeof verifySchema>;

interface VerifyEmailFormProps {
	email: string;
	onSuccess?: () => void;
}

export function VerifyEmailForm({ email, onSuccess }: VerifyEmailFormProps) {
	const [isResending, setIsResending] = useState(false);

	const verify = useAuthStore((state) => state.verifyEmail);

	const form = useForm<VerifyFormValues>({
		resolver: zodResolver(verifySchema),
		defaultValues: {
			code: '',
		},
	});

	const onSubmit = async (data: VerifyFormValues) => {
		const verData = { email, code: data.code };

		try {
			const res = await verify(verData);
			toast.success(res.message || 'Email verified successfully!');
			onSuccess?.();
		} catch (error: any) {
			toast.error(error.message || 'Verification failed. Please check your code.');
		}
	};

	const handleResendCode = async () => {
		setIsResending(true);
		try {
			const response = await authService.sendVerificationCode(email);
			toast(response.message || 'Verification code sent!');
		} catch (error: any) {
			toast.error(error.message || 'Failed to resend code.');
		} finally {
			setIsResending(false);
		}
	};

	const hasSubmittedRef = useRef(false);
	const code = form.watch('code');

	useEffect(() => {
		if (
			code?.length === 6 &&
			!form.formState.isSubmitting &&
			!hasSubmittedRef.current
		) {
			hasSubmittedRef.current = true;
			form.handleSubmit(onSubmit)();
		}
	}, [code]);

	useEffect(() => {
		if (code?.length < 6) {
			hasSubmittedRef.current = false;
			form.clearErrors('code');
		}
	}, [code]);

	return (
		<div className='space-y-6 sm:px-10'>
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
						className='w-full h-12 bg-brand-700 hover:bg-brand-800 text-white rounded-full'
					>
						{form.formState.isSubmitting ? (
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
		</div>
	);
}
