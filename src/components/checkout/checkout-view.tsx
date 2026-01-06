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
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import Image from 'next/image';

const checkoutSchema = z.object({
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

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
	onSuccess: (data: CheckoutFormValues) => void;
	isAuthenticated: boolean;
	userEmail: string;
}

function CheckoutView({
	onSuccess,
	isAuthenticated,
	userEmail,
}: CheckoutFormProps) {
	const form = useForm({
		resolver: zodResolver(checkoutSchema),
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

	const onSubmit = (data: CheckoutFormValues) => {
		onSuccess(data);
	};

	return (
		<div className='px-5 sm:px-10 xl:px-20 pb-24 h-full overflow-y-auto'>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<div>
					<h3 className='text-sm font-medium text-gray-700 mb-3'>
						Customer Information
					</h3>
					{!isAuthenticated && (
						<div className='text-sm text-gray-600 mb-3'>
							Have an account?{' '}
							<button
								type='button'
								className='text-purple-600 hover:underline font-medium'
							>
								Login
							</button>
						</div>
					)}

					<Input
						placeholder='hello@example.com'
						type='email'
						disabled={isAuthenticated}
						{...form.register('email')}
					/>
					{form.formState.errors.email && (
						<p className='text-sm text-red-500 mt-1'>
							{form.formState.errors.email.message}
						</p>
					)}
				</div>

				<div>
					<h3 className='text-sm font-medium text-gray-700 mb-3'>
						Shipping Address
					</h3>
					<div className='space-y-4'>
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<Input placeholder='First name' {...form.register('firstName')} />
								{form.formState.errors.firstName && (
									<p className='text-sm text-red-500 mt-1'>
										{form.formState.errors.firstName.message}
									</p>
								)}
							</div>
							<div>
								<Input placeholder='Last name' {...form.register('lastName')} />
								{form.formState.errors.lastName && (
									<p className='text-sm text-red-500 mt-1'>
										{form.formState.errors.lastName.message}
									</p>
								)}
							</div>
						</div>

						<div className='flex gap-3'>
							<div className='flex items-center justify-center h-12 px-4 bg-gray-100 rounded-xl text-sm font-medium'>
								+1
							</div>
							<div className='flex-1'>
								<Input placeholder='Phone number' {...form.register('phone')} />
								{form.formState.errors.phone && (
									<p className='text-sm text-red-500 mt-1'>
										{form.formState.errors.phone.message}
									</p>
								)}
							</div>
						</div>

						<div>
							<Input placeholder='Address' {...form.register('address')} />
							{form.formState.errors.address && (
								<p className='text-sm text-red-500 mt-1'>
									{form.formState.errors.address.message}
								</p>
							)}
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<div>
								<Input placeholder='City' {...form.register('city')} />
								{form.formState.errors.city && (
									<p className='text-sm text-red-500 mt-1'>
										{form.formState.errors.city.message}
									</p>
								)}
							</div>
							<div>
								<Input placeholder='Country' {...form.register('country')} />
								{form.formState.errors.country && (
									<p className='text-sm text-red-500 mt-1'>
										{form.formState.errors.country.message}
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
export default CheckoutView;
