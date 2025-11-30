'use client';

import type React from 'react';
import { useState } from 'react';
import { BaseModal } from '../base-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useModal } from '@/context/ModalContext';

export function CustomerInfoModal() {
	const { closeModal, openModal } = useModal();
	const [formData, setFormData] = useState({
		email: '',
		fullName: '',
		address: '',
		city: '',
		zipCode: '',
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Customer info:', formData);
		openModal('payment');
	};

	return (
		<BaseModal
			title='Customer Information'
			footer={
				<Button
					onClick={handleSubmit}
					className='w-full bg-[#7c70ff] hover:bg-[#897ef1] text-white'
				>
					Continue to Payment
				</Button>
			}
		>
			<form className='space-y-4'>
				<div>
					<label className='block text-sm font-medium mb-1'>Email</label>
					<Input
						type='email'
						placeholder='your@email.com'
						value={formData.email}
						onChange={(e) => setFormData({ ...formData, email: e.target.value })}
					/>
				</div>
				<div>
					<label className='block text-sm font-medium mb-1'>Full Name</label>
					<Input
						type='text'
						placeholder='John Doe'
						value={formData.fullName}
						onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
					/>
				</div>
				<div>
					<label className='block text-sm font-medium mb-1'>Shipping Address</label>
					<Input
						type='text'
						placeholder='123 Main St'
						value={formData.address}
						onChange={(e) => setFormData({ ...formData, address: e.target.value })}
					/>
				</div>
				<div className='grid grid-cols-2 gap-3'>
					<div>
						<label className='block text-sm font-medium mb-1'>City</label>
						<Input
							type='text'
							placeholder='New York'
							value={formData.city}
							onChange={(e) => setFormData({ ...formData, city: e.target.value })}
						/>
					</div>
					<div>
						<label className='block text-sm font-medium mb-1'>Zip Code</label>
						<Input
							type='text'
							placeholder='10001'
							value={formData.zipCode}
							onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
						/>
					</div>
				</div>
			</form>
		</BaseModal>
	);
}

export function PaymentModal() {
	const { closeModal, openModal } = useModal();
	const [paymentMethod, setPaymentMethod] = useState('card');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Payment method:', paymentMethod);
		openModal('order-confirmed');
	};

	return (
		<BaseModal
			title='Payment'
			footer={
				<Button
					onClick={handleSubmit}
					className='w-full bg-[#7c70ff] hover:bg-[#897ef1] text-white'
				>
					Pay Now
				</Button>
			}
		>
			<div className='space-y-4'>
				<div className='space-y-2'>
					<label className='flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-muted'>
						<input
							type='radio'
							name='payment'
							value='card'
							checked={paymentMethod === 'card'}
							onChange={(e) => setPaymentMethod(e.target.value)}
							className='mr-3'
						/>
						<span className='font-medium'>Credit Card</span>
					</label>
					<label className='flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-muted'>
						<input
							type='radio'
							name='payment'
							value='paypal'
							checked={paymentMethod === 'paypal'}
							onChange={(e) => setPaymentMethod(e.target.value)}
							className='mr-3'
						/>
						<span className='font-medium'>PayPal</span>
					</label>
					<label className='flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-muted'>
						<input
							type='radio'
							name='payment'
							value='apple'
							checked={paymentMethod === 'apple'}
							onChange={(e) => setPaymentMethod(e.target.value)}
							className='mr-3'
						/>
						<span className='font-medium'>Apple Pay</span>
					</label>
				</div>
			</div>
		</BaseModal>
	);
}

export function OrderConfirmedModal() {
	const { closeModal } = useModal();

	return (
		<BaseModal title='Order Confirmed' onClose={closeModal}>
			<div className='text-center py-6'>
				<div className='mb-6 flex justify-center'>
					<div className='text-6xl'>🌳</div>
				</div>
				<h3 className='text-lg font-semibold mb-2'>Your Order is Confirmed!</h3>
				<p className='text-sm text-muted-foreground mb-6'>
					We've sent you a confirmation email with your order details and tracking
					information.
				</p>
				<Button
					onClick={() => closeModal()}
					className='w-full bg-[#7c70ff] hover:bg-[#897ef1] text-white'
				>
					Done
				</Button>
			</div>
		</BaseModal>
	);
}
