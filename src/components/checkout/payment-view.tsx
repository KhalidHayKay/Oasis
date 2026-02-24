'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
	Form,
	// FormControl,
	// FormField,
	// FormItem,
	// FormMessage,
} from '@/components/ui/form';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { useEffect, useCallback } from 'react';
import type {
	FooterButtonSetterType,
	IsLoadingSetterType,
} from './checkout-drawer';
import {
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { toast } from 'sonner';
import { appEvent } from '@/lib/events/appEvent';

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
	setIsLoading: IsLoadingSetterType;
	next: () => void;
	onSuccess: () => void;
	onFailed: (
		errorMessage: string,
		shouldContactSupport: boolean,
		paymentRef?: string | undefined,
	) => void;
}

const PaymentView = ({
	checkoutSession,
	setFooterButton,
	setIsLoading,
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

	const confirmPayment = useCheckoutStore((state) => state.confirmPayment);

	const onSubmit = useCallback(
		async (values: PaymentFormValues) => {
			if (!stripe || !elements) {
				console.error('Stripe not loaded');
				return;
			}

			console.log('Billing address:', values);
			console.log('Shipping address:', checkoutSession.shippingAddress);

			setIsLoading(true);

			try {
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
						// Wait for backend to confirm and create order
						const result = await confirmPayment();
						if (result.success) {
							onSuccess();
						} else {
							// Payment went through but order creation failed
							console.error('Order creation error:', result.error);
							onFailed(
								result.error ?? 'Order creation failed',
								result.shouldContactSupport || false,
								paymentIntent.id,
							);
						}
					} catch (orderError) {
						console.error('Order creation error:', orderError);
						toast.error(
							orderError instanceof Error
								? orderError.message
								: 'Order creation failed',
						);
					}
				}
			} catch (error) {
				console.error('Payment submission error:', error);
				toast.error('An error occurred during payment');
			} finally {
				appEvent.emit('checkoutCompleted', null);
				setIsLoading(false);
			}
		},
		[
			stripe,
			elements,
			confirmPayment,
			checkoutSession.shippingAddress,
			setIsLoading,
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
