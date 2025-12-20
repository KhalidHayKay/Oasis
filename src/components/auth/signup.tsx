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
import { Loader2 } from 'lucide-react';
import Social from './social';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';

const signupSchema = z
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

type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
	onSuccess: () => void;
	onSwitchToLogin?: () => void;
	onNeedVerification: (email: string) => void;
}

export function SignupForm({
	onSuccess,
	onSwitchToLogin,
	onNeedVerification,
}: SignupFormProps) {
	const signup = useAuthStore((state) => state.register);

	const form = useForm<SignupFormValues>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			password_confirmation: '',
			terms: false,
		},
	});

	const onSubmit = async (data: SignupFormValues) => {
		try {
			const res = await signup(data);
			onNeedVerification(data.email);
			toast.success(res.message || 'Reg successful');
		} catch (error: any) {
			onNeedVerification(data.email);
			toast.error(error.message || 'Registration failed. Please try again.');
		}
	};

	return (
		<div className='space-y-6 sm:px-10'>
			<div className='space-y-2'>
				<div className='size-[150px] mx-auto mb-4'>
					<img
						src='/images/cat/bed.png'
						alt='Welcome'
						className='w-full h-full object-contain'
					/>
				</div>
				<h2 className='text-lg font-medium text-foreground'>
					Let's get your account set up
				</h2>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder='Full Name'
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

					<FormField
						control={form.control}
						name='password_confirmation'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder='Confirm Password'
										type='password'
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
								Creating account...
							</>
						) : (
							'Create account'
						)}
					</Button>

					<FormField
						control={form.control}
						name='terms'
						render={({ field }) => (
							<FormItem className='flex items-start space-x-2 space-y-0'>
								<FormControl>
									<Checkbox checked={field.value} onCheckedChange={field.onChange} />
								</FormControl>
								<div className='leading-none'>
									<label className='text-sm text-gray-600'>
										I agree to the{' '}
										<a href='/terms' className='text-brand-700 hover:underline'>
											Terms & Conditions
										</a>{' '}
										of Oasis and acknowledge the a{' '}
										<a href='/terms' className='text-brand-700 hover:underline'>
											Privacy Policy
										</a>
									</label>
									<FormMessage />
								</div>
							</FormItem>
						)}
					/>
				</form>
			</Form>

			<Social />

			<div className='text-center text-sm text-gray-600'>
				Already have an account?{' '}
				<button
					type='button'
					onClick={onSwitchToLogin}
					className='text-brand-700 hover:text-brand-800 font-medium'
				>
					Log in
				</button>
			</div>
		</div>
	);
}
