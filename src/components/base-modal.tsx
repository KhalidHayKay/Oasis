'use client';

import type React from 'react';
import { X } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

interface BaseModalProps {
	title: string;
	children: React.ReactNode;
	onClose?: () => void;
	footer?: React.ReactNode;
}

export function BaseModal({
	title,
	children,
	onClose,
	footer,
}: BaseModalProps) {
	const { closeModal } = useModal();

	const handleClose = () => {
		onClose?.();
		closeModal();
	};

	return (
		<>
			{/* Backdrop overlay */}
			<div
				className='fixed inset-0 bg-black/40 z-40'
				onClick={handleClose}
				aria-hidden='true'
			/>

			{/* Modal */}
			<div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
				<div className='bg-card rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto'>
					{/* Header */}
					<div className='flex items-center justify-between p-6 border-b border-border'>
						<h2 className='text-xl font-semibold text-foreground'>{title}</h2>
						<button
							onClick={handleClose}
							className='p-1 hover:bg-muted rounded-md transition-colors'
							aria-label='Close modal'
						>
							<X className='w-5 h-5 text-muted-foreground' />
						</button>
					</div>

					{/* Content */}
					<div className='p-6'>{children}</div>

					{/* Footer */}
					{footer && <div className='p-6 border-t border-border'>{footer}</div>}
				</div>
			</div>
		</>
	);
}
