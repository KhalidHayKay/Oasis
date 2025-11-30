'use client';
import { useModal } from '@/context/ModalContext';
import {
	LoginModal,
	SignupModal,
	ForgotPasswordModal,
} from './modals/auth-modals';
import {
	CustomerInfoModal,
	PaymentModal,
	OrderConfirmedModal,
} from './modals/checkout-modals';

export function ModalManager() {
	const { activeModal } = useModal();

	return (
		<>
			{activeModal === 'login' && <LoginModal />}
			{activeModal === 'signup' && <SignupModal />}
			{activeModal === 'forgot-password' && <ForgotPasswordModal />}
			{activeModal === 'customer-info' && <CustomerInfoModal />}
			{activeModal === 'payment' && <PaymentModal />}
			{activeModal === 'order-confirmed' && <OrderConfirmedModal />}
		</>
	);
}
