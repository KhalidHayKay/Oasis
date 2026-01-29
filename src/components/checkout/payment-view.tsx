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
import StripeElement from '../stripe/stripe-element';
import {
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { toast } from 'sonner';

const paymentSchema = z
	.object({
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
	onSuccess: () => void;
	onFailed: () => void;
}

const PaymentView = ({
	checkoutSession,
	setFooterButton,
	next,
	onSuccess,
	onFailed,
}: PaymentViewProps) => {
	const form = useForm<PaymentFormValues>({
		resolver: zodResolver(paymentSchema),
		defaultValues: {
			useShipping: true,

			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			city: '',
			country: '',
		},
	});

	const stripe = useStripe();
	const elements = useElements();

	const [isProcessing, setIsProcessing] = useState(false);

	const confirmPayment = useCheckoutStore((state) => state.confirmPayment);

	const useShippingValue = useWatch({
		control: form.control,
		name: 'useShipping',
	});

	const onSubmit = useCallback(
		async (values: PaymentFormValues) => {
			if (!stripe || !elements) {
				console.error('Stripe not loaded');
				return;
			}

			setIsProcessing(true);

			try {
				// Build billing details
				{
					/*const billingDetails = values.useShipping
					? {
							// Use shipping address from checkoutSession
							name: `${checkoutSession.shippingAddress.firstName} ${checkoutSession.shippingAddress.lastName}`,
							phone: checkoutSession.shippingAddress.phone,
							address: {
								line1: checkoutSession.shippingAddress.address,
								city: checkoutSession.shippingAddress.city,
								country: checkoutSession.shippingAddress.country,
								postal_code: '00000',
								state: 'N/A',
							},
						}
					: {
							// Use custom billing address
							name: `${values.firstName} ${values.lastName}`,
							phone: values.phone,
							address: {
								line1: values.address,
								city: values.city,
								country: values.country,
								postal_code: '00000',
								state: 'N/A',
							},
						};
						*/
				}
				// console.log(billingDetails);

				const { error, paymentIntent } = await stripe.confirmPayment({
					elements,
					confirmParams: {
						return_url: `${window.location.origin}/checkout/success`,
					},
					redirect: 'if_required',
				});

				if (error) {
					console.error('Payment error:', error);
					toast.error(error.message || 'Payment failed');
					return;
				}

				if (paymentIntent && paymentIntent.status === 'succeeded') {
					next();

					try {
						await new Promise((resolve) => setTimeout(resolve, 1500));
						await confirmPayment();
						onSuccess();
					} catch (orderError) {
						console.error('Order creation error:', orderError);
						onFailed();
					}
				}
			} catch (error) {
				console.error('Payment submission error:', error);
				toast.error('An error occurred during payment');
			} finally {
				setIsProcessing(false);
			}
		},
		[
			stripe,
			elements,
			checkoutSession,
			confirmPayment,
			next,
			onSuccess,
			onFailed,
		],
	);

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

	return (
		<div className='px-5'>
			<Form {...form}>
				<form className='grid grid-cols-2 gap-4'>
					<div className='col-span-2'>
						<PaymentElement
							options={{
								layout: {
									type: 'auto',
									defaultCollapsed: false,
									radios: false,
									spacedAccordionItems: false,
								},
								paymentMethodOrder: ['card'],
								wallets: {
									applePay: 'never',
									googlePay: 'never',
								},
								fields: {
									billingDetails: {
										address: 'auto',
									},
								},
							}}
						/>
					</div>

					{/* <FormField
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
					/> */}

					{/* <FormField
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
					/> */}
				</form>
			</Form>
		</div>
	);
};

export default PaymentView;
