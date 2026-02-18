import { useCartStore } from '@/store/useCartStore';
import { useEffect, useState, useCallback } from 'react';
import CartView from './cart-view';
import { AppDrawer } from '../app-drawer';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import OrderSummaryView from './order-summary-view';
import ShippingAddressView from './shipping-address-view';
import PaymentCardView from './payment-view';
import StripeElement from '../stripe/stripe-element';
import { SuccessView, ProcessingView, FailureView } from './order-status-view';

export type CheckoutView =
	| 'cart'
	| 'validation'
	| 'address'
	| 'summary'
	| 'payment'
	| 'processing'
	| 'success'
	| 'failure';

interface CheckoutDrawerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	defaultView?: CheckoutView;
	userEmail?: string;
	onAuthRequired: () => void;
}

export type FooterButton = {
	label: string;
	action: () => void;
};

export type FooterButtonSetterType = React.Dispatch<
	React.SetStateAction<FooterButton | null>
>;

type ViewContentType = Record<
	CheckoutView,
	{
		title: string;
		render: () => React.ReactNode;
	}
>;

export type IsLoadingSetterType = React.Dispatch<React.SetStateAction<boolean>>;

export function CheckoutDrawer({
	open,
	onOpenChange,
	userEmail = '',
	onAuthRequired,
}: CheckoutDrawerProps) {
	const [currentView, setCurrentView] = useState<CheckoutView>('cart');
	const [footerButton, setFooterButton] = useState<FooterButton | null>(null);
	const [isLoading, setIsloading] = useState(false);
	const [paymentErrorDetails, setPaymentErrorDetails] = useState<{
		errorMessage: string;
		shouldContactSupport: boolean;
		paymenmtReference?: string;
	}>({ errorMessage: '', shouldContactSupport: false });

	const items = useCartStore((state) => state.items);
	const session = useCheckoutStore((state) => state.session);

	const handleClose = () => {
		onOpenChange(false);
	};

	// Memoize callbacks to prevent infinite rerenders
	const goToAddress = useCallback(() => setCurrentView('address'), []);
	const goToSummary = useCallback(() => setCurrentView('summary'), []);
	const goToPayment = useCallback(() => setCurrentView('payment'), []);
	const goToProcessing = useCallback(() => setCurrentView('processing'), []);

	const handleSuccess = useCallback(() => setCurrentView('success'), []);
	const handleFailure = useCallback(
		(
			errorMessage: string,
			shouldContactSupport: boolean,
			paymentRef?: string,
		) => {
			setPaymentErrorDetails({
				errorMessage,
				shouldContactSupport,
				paymenmtReference: paymentRef,
			});
			setCurrentView('failure');
		},
		[],
	);

	useEffect(() => {
		if (!session) return;

		const syncView = (step: CheckoutView) => {
			setCurrentView(step);
		};

		syncView(session.currentStep);
	}, [session]);

	// Reset drawer state when it closes
	useEffect(() => {
		if (!open && footerButton !== null) {
			Promise.resolve().then(() => setFooterButton(null));
		}
	}, [open, footerButton]);

	const viewContent: ViewContentType = {
		cart: {
			title: 'Cart',
			render: () => (
				<CartView
					items={items}
					setFooterButton={setFooterButton}
					onAuthRequired={onAuthRequired}
					setIsLoading={setIsloading}
					next={goToAddress}
				/>
			),
		},
		validation: {
			title: 'Validation',
			render: () => null,
		},
		address: {
			title: 'Checkout',
			render: () => (
				<ShippingAddressView
					userEmail={userEmail}
					setFooterButton={setFooterButton}
					setIsLoading={setIsloading}
					next={goToSummary}
				/>
			),
		},
		summary: {
			title: 'Order summary',
			render: () => (
				<OrderSummaryView
					checkoutSession={session as CheckoutSession}
					setFooterButton={setFooterButton}
					setIsLoading={setIsloading}
					next={goToPayment}
				/>
			),
		},
		payment: {
			title: 'Payment',
			render: () => (
				<StripeElement>
					<PaymentCardView
						checkoutSession={session as CheckoutSession}
						setFooterButton={setFooterButton}
						setIsLoading={setIsloading}
						next={goToProcessing}
						onSuccess={handleSuccess}
						onFailed={handleFailure}
					/>
				</StripeElement>
			),
		},
		processing: {
			title: '',
			render: () => <ProcessingView />,
		},
		success: {
			title: '',
			render: () => (
				<SuccessView
					onDone={() => {
						handleClose();
						setCurrentView('cart');
					}}
				/>
			),
		},
		failure: {
			title: '',
			render: () => (
				<FailureView
					errorMessage={paymentErrorDetails.errorMessage}
					onContactSupport={
						paymentErrorDetails.shouldContactSupport
							? () => console.log('Contact support')
							: undefined
					}
					paymentReference={paymentErrorDetails.paymenmtReference}
				/>
			),
		},
	};

	const currentViewConfig = viewContent[currentView];

	return (
		<AppDrawer
			title={currentViewConfig.title}
			open={open}
			onOpenChange={onOpenChange}
			onClose={handleClose}
			footerButton={
				footerButton
					? {
							label: footerButton.label,
							onClick: footerButton.action,
							loading: isLoading,
						}
					: undefined
			}
		>
			{currentViewConfig.render()}
		</AppDrawer>
	);
}
