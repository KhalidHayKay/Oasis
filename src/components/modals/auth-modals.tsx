'use client';

import type React from 'react';
import { useState } from 'react';
import { BaseModal } from '../base-modal';
import { useModal } from '@/context/ModalContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function LoginModal() {
	const { closeModal, openModal } = useModal();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Login:', { email, password });
		closeModal();
	};

	return (
		<BaseModal
			title='Login'
			footer={
				<div className='space-y-3'>
					<Button
						onClick={handleSubmit}
						className='w-full bg-[#7c70ff] hover:bg-[#897ef1] text-white'
					>
						Login
					</Button>
					<div className='text-center text-sm text-muted-foreground'>
						Don't have an account?{' '}
						<button
							onClick={() => openModal('signup')}
							className='text-[#7c70ff] hover:underline font-medium'
						>
							Sign up
						</button>
					</div>
				</div>
			}
		>
			<form className='space-y-4'>
				<div>
					<label className='block text-sm font-medium mb-1'>Email</label>
					<Input
						type='email'
						placeholder='your@email.com'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<label className='block text-sm font-medium mb-1'>Password</label>
					<Input
						type='password'
						placeholder='Enter your password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button
					type='button'
					onClick={() => openModal('forgot-password')}
					className='text-sm text-[#7c70ff] hover:underline'
				>
					Forgot password?
				</button>
			</form>
		</BaseModal>
	);
}

export function SignupModal() {
	const { closeModal, openModal } = useModal();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Signup:', formData);
		closeModal();
	};

	return (
		<BaseModal
			title='Create an account'
			footer={
				<div className='space-y-3'>
					<Button
						onClick={handleSubmit}
						className='w-full bg-[#7c70ff] hover:bg-[#897ef1] text-white'
					>
						Create Account
					</Button>
					<div className='text-center text-sm text-muted-foreground'>
						Already have an account?{' '}
						<button
							onClick={() => openModal('login')}
							className='text-[#7c70ff] hover:underline font-medium'
						>
							Login
						</button>
					</div>
				</div>
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
					<label className='block text-sm font-medium mb-1'>Password</label>
					<Input
						type='password'
						placeholder='Create a password'
						value={formData.password}
						onChange={(e) => setFormData({ ...formData, password: e.target.value })}
					/>
				</div>
				<div>
					<label className='block text-sm font-medium mb-1'>Confirm Password</label>
					<Input
						type='password'
						placeholder='Confirm your password'
						value={formData.confirmPassword}
						onChange={(e) =>
							setFormData({ ...formData, confirmPassword: e.target.value })
						}
					/>
				</div>
			</form>
		</BaseModal>
	);
}

export function ForgotPasswordModal() {
	const { closeModal, openModal } = useModal();
	const [email, setEmail] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
		console.log('Reset email sent to:', email);
		setTimeout(() => closeModal(), 2000);
	};

	return (
		<BaseModal
			title='Forgot password'
			footer={
				<div className='space-y-3'>
					{!submitted && (
						<>
							<Button
								onClick={handleSubmit}
								className='w-full bg-[#7c70ff] hover:bg-[#897ef1] text-white'
							>
								Send Reset Link
							</Button>
							<button
								onClick={() => openModal('login')}
								className='w-full text-sm text-[#7c70ff] hover:underline'
							>
								Back to Login
							</button>
						</>
					)}
					{submitted && (
						<div className='text-center text-sm text-green-600'>
							Check your email for the reset link
						</div>
					)}
				</div>
			}
		>
			{!submitted ? (
				<form className='space-y-4'>
					<p className='text-sm text-muted-foreground mb-4'>
						Enter your email address and we'll send you a link to reset your password.
					</p>
					<div>
						<label className='block text-sm font-medium mb-1'>Email</label>
						<Input
							type='email'
							placeholder='your@email.com'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
				</form>
			) : (
				<div className='text-center py-4'>
					<p className='text-sm text-muted-foreground'>
						Reset link has been sent to <strong>{email}</strong>
					</p>
				</div>
			)}
		</BaseModal>
	);
}
