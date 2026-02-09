import Image from 'next/image';
import AppButton from '../app-button';
import { Button } from '../ui/button';
import { useState } from 'react';

export const ProcessingView = () => {
	return (
		<div className='flex flex-col items-center justify-center gap-y-3 text-foreground text-center'>
			<div className='relative w-[200px] h-[200px] mx-auto mb-5 flex items-center justify-center'>
				<div className='absolute inset-0 flex items-center justify-center'>
					<div className='w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin' />
				</div>
			</div>
			<h2 className='text-2xl font-semibold text-center mb-4'>
				Processing Your Order...
			</h2>
			<div className='text-sm sm:text-base'>
				<p className=''>
					Please wait while we confirm your payment and create your order.
				</p>
				<p>This usually takes just a few seconds.</p>
			</div>
		</div>
	);
};

export const SuccessView = ({ onDone }: { onDone: () => void }) => {
	return (
		<div className='flex flex-col items-center justify-center gap-y-3 text-foreground text-center'>
			<Image
				src='/images/happy-tree.png'
				alt='Success'
				width={200}
				height={200}
				className='mx-auto mb-5'
			/>
			<h2 className='text-2xl font-semibold text-center mb-4'>
				Your Order is Confirmed!
			</h2>
			<div className='text-sm sm:text-base'>
				<p className=''>
					Your order has been successfully processed, and a confirmation email has
					been sent to your inbox.
				</p>
				<p>Get ready to transform your space with your new furniture!</p>
			</div>
			<AppButton className='w-full mt-10' onClick={onDone}>
				Done
			</AppButton>
		</div>
	);
};

export const FailureView = ({
	onContactSupport,
	errorMessage,
	paymentReference,
}: {
	errorMessage?: string;
	onContactSupport?: () => void;
	paymentReference?: string;
}) => {
	const [copied, setCopied] = useState(false);
	const shouldContactSupport = !!onContactSupport;

	const handleCopy = () => {
		if (!paymentReference) return;

		navigator.clipboard.writeText(paymentReference);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className='flex flex-col items-center justify-center gap-y-4 text-foreground text-center p-4'>
			{/* Visual Indicator */}
			<div className='w-16 h-16 rounded-full flex items-center justify-center bg-destructive/10 mb-2'>
				<span className='text-destructive text-3xl font-bold'>
					{shouldContactSupport ? '!' : '✕'}
				</span>
			</div>

			<h2 className='text-2xl font-bold'>
				{shouldContactSupport ? 'Action Required' : 'Transaction Failed'}
			</h2>

			<div className='space-y-3'>
				<p className='text-sm sm:text-base font-medium'>
					Your payment went through, but we couldn't create your order automatically.
				</p>

				{/* Reference Box - High Visibility */}
				<div className='bg-muted p-4 rounded-xl border border-border shadow-sm'>
					<p className='text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-2'>
						Required Reference
					</p>
					<div className='flex items-center gap-3 justify-center'>
						<code className='bg-background px-3 py-1.5 rounded border font-mono text-sm font-semibold'>
							{paymentReference}
						</code>
						<button
							onClick={handleCopy}
							className='text-xs font-bold text-primary hover:opacity-80 transition-opacity uppercase'
						>
							{copied ? 'Copied' : 'Copy'}
						</button>
					</div>
				</div>

				<p className='text-xs text-muted-foreground'>Error: {errorMessage}</p>
			</div>

			{/* Action Buttons */}
			<div className='w-full mt-4 flex flex-col gap-2'>
				{shouldContactSupport && (
					<AppButton className='w-full rounded-lg' onClick={onContactSupport}>
						Contact Support Now
					</AppButton>
				)}

				<Button
					variant='outline'
					className='w-full'
					onClick={() => (window.location.href = '/')}
				>
					{shouldContactSupport ? 'Return to Home' : 'Try Again'}
				</Button>
			</div>
		</div>
	);
};
