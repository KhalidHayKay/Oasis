import { useCartStore } from '@/store/useCartStore';
import { useEffect, useState } from 'react';
import CartView from './cart-view';
import { AppDrawer } from '../app-drawer';
import CheckoutView, { CheckoutFormValues } from './checkout-view';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import CartSummaryView from './cart-summary-view';

type CheckoutView =
	| 'cart'
	| 'validation'
	| 'checkout'
	| 'summary'
	| 'payment'
	| 'success';

interface CheckoutDrawerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	defaultView?: CheckoutView;
	isAuthenticated?: boolean;
	userEmail?: string;
	onAuthRequired: () => void;
}

export type FooterActionSetterType = React.Dispatch<
	React.SetStateAction<(() => void) | null>
>;

export function CheckoutDrawer({
	open,
	onOpenChange,
	defaultView = 'cart',
	isAuthenticated = false,
	userEmail = '',
	onAuthRequired,
}: CheckoutDrawerProps) {
	const [currentView, setCurrentView] = useState<CheckoutView>(defaultView);
	const [footerAction, setFooterAction] = useState<(() => void) | null>(null);
	// const [shippingData, setShippingData] = useState(null);

	const items = useCartStore((state) => state.items);
	const session = useCheckoutStore((state) => state.session);

	useEffect(() => {
		console.log(session);
		if (session) {
			setCurrentView('payment');
		}
	}, [session]);

	const handleClose = () => {
		onOpenChange(false);
		setTimeout(() => setCurrentView(defaultView), 300);
	};

	const handleCheckoutAttempt = () => {
		if (!isAuthenticated) {
			onAuthRequired();
			return;
		}

		setCurrentView('checkout');
	};

	// const canGoBack = currentView === 'checkout' || currentView === 'payment';

	// const handleBack = () => {
	// 	if (currentView === 'payment') setCurrentView('checkout');
	// 	else if (currentView === 'checkout') setCurrentView('cart');
	// };

	const getTitle = () => {
		switch (currentView) {
			case 'cart':
				return 'Cart';
			case 'checkout':
				return 'Checkout';
			case 'summary':
				return 'Cart Summary';
			case 'payment':
				return 'Payment';
			case 'success':
				return '';
			default:
				return 'Cart';
		}
	};

	const getButtonLabel = () => {
		switch (currentView) {
			case 'cart':
				return 'Next';
			case 'checkout':
				return 'Proceed to Payment';
			case 'payment':
				return 'Pay Now';
			default:
				return 'Continue';
		}
	};

	const getFooterClick = () => {
		if (footerAction) {
			footerAction();
		} else {
			// Fallback behavior if no action is set
			switch (currentView) {
				case 'cart':
					handleCheckoutAttempt();
					break;
				case 'checkout':
					console.warn('No footer action set for checkout view');
					break;
				case 'payment':
					console.warn('No footer action set for payment view');
					break;
			}
		}
	};

	const renderContent = () => {
		switch (currentView) {
			case 'cart':
				return <CartView items={items} />;

			case 'checkout':
				return (
					<CheckoutView
						userEmail={userEmail}
						setFooterAction={setFooterAction}
						next={() => setCurrentView('summary')}
					/>
				);
			case 'summary':
				return (
					<CartSummaryView
						items={items}
						checkoutSession={session}
						setFooterAction={setFooterAction}
						onNext={() => setCurrentView('payment')}
					/>
				);
			case 'payment':
				return ''; // <PaymentView onSuccess={handlePaymentSuccess} />;

			case 'success':
				return ''; // <SuccessView />;

			default:
				return ''; // <div>Unknown view</div>;
		}
	};

	const shouldShowFooterButton = currentView !== 'success' && items.length !== 0;

	return (
		<AppDrawer
			title={getTitle()}
			open={open}
			onOpenChange={onOpenChange}
			onClose={handleClose}
			footerButton={
				shouldShowFooterButton
					? { label: getButtonLabel(), onClick: getFooterClick }
					: undefined
			}
		>
			{renderContent()}
		</AppDrawer>
	);
}

//   showBackButton={canGoBack}
//   onBack={handleBack}
