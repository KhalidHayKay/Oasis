import { useCartStore } from '@/store/useCartStore';
import { useEffect, useState, useCallback } from 'react';
import CartView from './cart-view';
import { AppDrawer } from '../app-drawer';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import OrderSummaryView from './order-summary-view';
import ShippingAddressView from './shipping-address-view';
import PaymentCardView from './payment-view';
import StripeElement from '../stripe/stripe-element';

export type CheckoutView =
	| 'cart'
	| 'validation'
	| 'address'
	| 'summary'
	| 'payment'
	| 'success';

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

export function CheckoutDrawer({
	open,
	onOpenChange,
	userEmail = '',
	onAuthRequired,
}: CheckoutDrawerProps) {
	const [currentView, setCurrentView] = useState<CheckoutView>('cart');
	const [footerButton, setFooterButton] = useState<FooterButton | null>(null);

	const items = useCartStore((state) => state.items);
	const session = useCheckoutStore((state) => state.session);

	const handleClose = () => {
		onOpenChange(false);
	};

	// Memoize callbacks to prevent infinite rerenders
	const handleAddressNext = useCallback(() => setCurrentView('address'), []);
	const handleSummaryNext = useCallback(() => setCurrentView('summary'), []);
	const handlePaymentNext = useCallback(() => setCurrentView('payment'), []);
	const handlePaid = useCallback(() => setCurrentView('success'), []);

	// const canGoBack = currentView === 'checkout' || currentView === 'payment';

	// const handleBack = () => {
	// 	if (currentView === 'payment') setCurrentView('checkout');
	// 	else if (currentView === 'checkout') setCurrentView('cart');
	// };

	useEffect(() => {
		if (session?.currentStep) {
			setCurrentView(session.currentStep as CheckoutView);
		}
	}, [session?.currentStep]);

	// Reset drawer state when it closes
	useEffect(() => {
		if (!open) {
			setFooterButton(null);
		}
	}, [open]);

	const viewContent: ViewContentType = {
		cart: {
			title: 'Cart',
			render: () => (
				<CartView
					items={items}
					setFooterButton={setFooterButton}
					onAuthRequired={onAuthRequired}
					next={handleAddressNext}
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
					next={handleSummaryNext}
				/>
			),
		},
		summary: {
			title: 'Order summary',
			render: () => (
				<OrderSummaryView
					checkoutSession={session as CheckoutSession}
					setFooterButton={setFooterButton}
					next={handlePaymentNext}
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
						next={handlePaid}
					/>
				</StripeElement>
			),
		},
		success: {
			title: '',
			render: () => null, // <SuccessView />
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
					? { label: footerButton.label, onClick: footerButton.action }
					: undefined
			}
		>
			{currentViewConfig.render()}
		</AppDrawer>
	);
}

//   showBackButton={canGoBack}
//   onBack={handleBack}
