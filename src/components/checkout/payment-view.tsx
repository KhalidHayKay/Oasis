'use client';

import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { useEffect, useCallback } from 'react';
import type { FooterButtonSetterType } from './checkout-drawer';
import { cn } from '@/lib/utils';
import { useWatch } from 'react-hook-form';

const paymentSchema = z
	.object({
		cardNumber: z
			.string()
			.min(13, 'Card number must be at least 13 digits')
			.max(19, 'Card number must be at most 19 digits')
			.regex(/^\d+$/, 'Card number must contain only digits'),
		expiryDate: z
			.string()
			.regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format'),
		cvv: z.string().regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
		nameOnCard: z
			.string()
			.min(2, 'Name must be at least 2 characters')
			.max(50, 'Name must be at most 50 characters'),
		useShipping: z.boolean(),

		firstName: z.string().optional(),
		lastName: z.string().optional(),
		phone: z.string().optional(),
		address: z.string().optional(),
		city: z.string().optional(),
		country: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		// If useShipping is false, billing address fields are required
		if (!data.useShipping) {
			if (!data.firstName || data.firstName.length < 1) {
				ctx.addIssue({
					code: 'custom',
					path: ['firstName'],
					message: 'First name is required',
				});
			}
			if (!data.lastName || data.lastName.length < 1) {
				ctx.addIssue({
					code: 'custom',
					path: ['lastName'],
					message: 'Last name is required',
				});
			}
			if (!data.phone || data.phone.length < 7) {
				ctx.addIssue({
					code: 'custom',
					path: ['phone'],
					message: 'Phone number must be at least 7 characters',
				});
			}
			if (!data.address || data.address.length < 5) {
				ctx.addIssue({
					code: 'custom',
					path: ['address'],
					message: 'Address must be at least 5 characters',
				});
			}
			if (!data.city || data.city.length < 2) {
				ctx.addIssue({
					code: 'custom',
					path: ['city'],
					message: 'City must be at least 2 characters',
				});
			}
			if (!data.country || data.country.length < 2) {
				ctx.addIssue({
					code: 'custom',
					path: ['country'],
					message: 'Country must be at least 2 characters',
				});
			}
		}
	});

type PaymentFormValues = z.infer<typeof paymentSchema>;

interface PaymentViewProps {
	checkoutSession: CheckoutSession;
	setFooterButton: FooterButtonSetterType;
	next: () => void;
}

const PaymentView = ({
	checkoutSession,
	setFooterButton,
	next,
}: PaymentViewProps) => {
	const form = useForm<PaymentFormValues>({
		resolver: zodResolver(paymentSchema),
		defaultValues: {
			cardNumber: '',
			expiryDate: '',
			cvv: '',
			nameOnCard: '',
			useShipping: true,

			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			city: '',
			country: '',
		},
	});

	const makePayment = useCheckoutStore((state) => state.makePayment);

	const useShippingValue = useWatch({
		control: form.control,
		name: 'useShipping',
	});

	const onSubmit = useCallback(async (values: PaymentFormValues) => {
		console.log(values, checkoutSession);
		// const reqData = {
		// 		cardNumber: data.cardNumber,
		// 		expiryDate: data.expiryDate,
		// 		cvv: data.cvv,
		// 		nameOnCard: data.nameOnCard,
		// 		rememberMe: data.rememberMe,
		// 	}

		try {
			await makePayment();
			// next();
		} catch (error) {
			console.error('Payment submission error:', error);
		}
	}, []);

	useEffect(() => {
		const handleFormSubmit = () => {
			form.handleSubmit(onSubmit)();
		};

		setFooterButton({
			label: 'Pay Now',
			action: handleFormSubmit,
		});

		return () => setFooterButton(null);
	}, [form, onSubmit, setFooterButton]);

	const handleCardNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, '').slice(0, 19);
		form.setValue('cardNumber', value);
	};

	const handleExpiryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/\D/g, '').slice(0, 4);
		if (value.length >= 2) {
			value = value.slice(0, 2) + '/' + value.slice(2);
		}
		form.setValue('expiryDate', value);
	};

	const handleCVVInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, '').slice(0, 4);
		form.setValue('cvv', value);
	};

	return (
		<div className='px-5'>
			<Form {...form}>
				<form className='grid grid-cols-2 gap-4'>
					{/* Card Number */}
					<FormField
						control={form.control}
						name='cardNumber'
						render={({ field }) => (
							<FormItem className='col-span-2'>
								<FormControl>
									<div className='relative'>
										<Input
											placeholder='Card number'
											{...field}
											onChange={handleCardNumberInput}
											className='pl-10 h-12 rounded-xl border-gray-200'
										/>
										<svg
											className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500'
											fill='currentColor'
											viewBox='0 0 20 20'
										>
											<path d='M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v2H4V6zm0 4h12v2H4v-2z' />
										</svg>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='expiryDate'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder='Exp. date'
										{...field}
										onChange={handleExpiryInput}
										maxLength={5}
										className='h-12 rounded-xl border-gray-200'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='cvv'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder='CVV'
										{...field}
										onChange={handleCVVInput}
										maxLength={4}
										type='password'
										className='h-12 rounded-xl border-gray-200'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Name on Card */}
					<FormField
						control={form.control}
						name='nameOnCard'
						render={({ field }) => (
							<FormItem className='col-span-2'>
								<FormControl>
									<Input
										placeholder='Name on card'
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
						name='useShipping'
						render={({ field }) => (
							<FormItem className='col-span-2 flex items-center space-x-2 pt-4 pb-10'>
								<FormControl>
									<Checkbox checked={field.value} onCheckedChange={field.onChange} />
								</FormControl>
								<label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer'>
									Use shipping address as billing address
								</label>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='firstName'
						render={({ field }) => (
							<FormItem
								className={cn('col-span-2', useShippingValue ? 'hidden' : 'block')}
							>
								<FormControl>
									<Input
										placeholder='First name'
										type='text'
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
						name='lastName'
						render={({ field }) => (
							<FormItem
								className={cn('col-span-2', useShippingValue ? 'hidden' : 'block')}
							>
								<FormControl>
									<Input
										placeholder='Last name'
										type='text'
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
						name='phone'
						render={({ field }) => (
							<FormItem
								className={cn('col-span-2', useShippingValue ? 'hidden' : 'block')}
							>
								<FormControl>
									<Input
										placeholder='Phone'
										type='tel'
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
						name='address'
						render={({ field }) => (
							<FormItem
								className={cn('col-span-2', useShippingValue ? 'hidden' : 'block')}
							>
								<FormControl>
									<Input
										placeholder='Address'
										type='text'
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
						name='city'
						render={({ field }) => (
							<FormItem className={cn(useShippingValue ? 'hidden' : 'block')}>
								<FormControl>
									<Input
										placeholder='City'
										type='text'
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
						name='country'
						render={({ field }) => (
							<FormItem className={cn(useShippingValue ? 'hidden' : 'block')}>
								<FormControl>
									<Input
										placeholder='Country'
										type='text'
										{...field}
										className='h-12 rounded-xl border-gray-200'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</div>
	);
};

export default PaymentView;
