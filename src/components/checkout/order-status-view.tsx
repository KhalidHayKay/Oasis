import Image from 'next/image';
import AppButton from '../app-button';

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
	errorMessage,
	contactSupport = null,
}: {
	errorMessage?: string;
	contactSupport: (() => void) | null;
}) => {
	return (
		<div className='flex flex-col items-center justify-center gap-y-3 text-foreground text-center'>
			<div className='w-[200px] h-[200px] mx-auto mb-5 flex items-center justify-center'>
				<div className='w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center'>
					<span className='text-destructive text-3xl'>✕</span>
				</div>
			</div>
			<h2 className='text-2xl font-semibold text-center mb-4'>
				Order Creation Failed
			</h2>
			<div className='text-sm sm:text-base space-y-2'>
				<p>
					Your payment was processed, but we encountered an issue creating your
					order.
				</p>
				{errorMessage && <p>{errorMessage}</p>}
			</div>
			{contactSupport && (
				<>
					<p className='font-medium'>
						Please contact our support team with your payment confirmation. We'll
						resolve this quickly.
					</p>
					<AppButton className='w-full mt-10' onClick={contactSupport}>
						Contact Support
					</AppButton>
				</>
			)}
		</div>
	);
};
