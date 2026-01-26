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
import { toast } from 'sonner';
import { FooterButtonSetterType } from './checkout-drawer';
import { useEffect, useCallback } from 'react';
import { useCheckoutStore } from '@/store/useCheckoutStore';

const AddressSchema = z.object({
	email: z.email('Invalid email address').max(255, 'Email is too long'),
	firstName: z
		.string()
		.min(1, 'First name is required')
		.max(100, 'First name is too long'),
	lastName: z
		.string()
		.min(1, 'Last name is required')
		.max(100, 'Last name is too long'),
	phone: z
		.string()
		.min(7, 'Phone number is too short')
		.max(20, 'Phone number is too long'),
	address: z
		.string()
		.min(5, 'Address is too short')
		.max(200, 'Address is too long'),
	city: z.string().min(2, 'City is too short').max(100, 'City is too long'),
	country: z
		.string()
		.min(2, 'Country is too short')
		.max(100, 'Country is too long'),
});

export type CheckoutFormValues = z.infer<typeof AddressSchema>;

interface ShippingAddressViewProps {
	userEmail: string;
	setFooterButton: FooterButtonSetterType;
	next: () => void;
}

const ShippingAddressView = ({
	userEmail,
	setFooterButton,
	next,
}: ShippingAddressViewProps) => {
	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(AddressSchema),
		defaultValues: {
			email: userEmail || '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			city: '',
			country: '',
		},
	});

	const setShippingAddress = useCheckoutStore((state) => state.addAddress);

	const onSubmit = useCallback(async (values: CheckoutFormValues) => {
		const data: Address = {
			shipping_fname: values.firstName,
			shipping_lname: values.lastName,
			shipping_phone: values.phone,
			shipping_address: values.address,
			shipping_country: values.country,
			shipping_city: values.city,
		};

		try {
			await setShippingAddress(data);
			next();
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: 'An error occured while trying to add address';
			toast.error(message);
		}
	}, []);

	useEffect(() => {
		const handleFormSubmit = () => {
			form.handleSubmit(onSubmit)();
		};

		setFooterButton({
			label: 'Next',
			action: handleFormSubmit,
		});

		return () => setFooterButton(null);
	}, [setFooterButton, form, onSubmit]);

	return (
		<div className='space-y-6'>
			<div className='space-y-2'>
				<h2 className='text-lg font-medium text-foreground'>
					Customer Information
				</h2>
			</div>

			<div className='w-full h-12 rounded-xl border-3 border-gray-200 px-2 text-sm flex items-center'>
				{userEmail || "You're not logged in"}
			</div>

			<div className='space-y-2'>
				<h2 className='text-lg font-medium text-foreground'>Shipping Address</h2>
			</div>

			<Form {...form}>
				<form className='grid grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='firstName'
						render={({ field }) => (
							<FormItem className='col-span-2'>
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
							<FormItem className='col-span-2'>
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
							<FormItem className='col-span-2'>
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
							<FormItem className='col-span-2'>
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
							<FormItem className='col-span-1'>
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
							<FormItem className='col-span-1'>
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
export default ShippingAddressView;
