import { useCartStore } from '@/store/useCartStore';
import { useState } from 'react';
import CartView from './cart-view';
import { AppDrawer } from '../app-drawer';

type CheckoutView = 'cart' | 'checkout' | 'payment' | 'success';

interface CheckoutDrawerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	defaultView?: CheckoutView;
	onSuccess?: () => void;
	isAuthenticated?: boolean;
	userEmail?: string;
}

export function CheckoutDrawer({
	open,
	onOpenChange,
	defaultView = 'cart',
	onSuccess,
	isAuthenticated = false,
	userEmail = '',
}: CheckoutDrawerProps) {
	const [currentView, setCurrentView] = useState<CheckoutView>(defaultView);
	const [shippingData, setShippingData] = useState(null);

	const items = useCartStore((state) => state.items);

	//   const handleUpdateQuantity = (id, newQuantity) => {
	//     setItems(items.map(item =>
	//       item.id === id ? { ...item, quantity: newQuantity } : item
	//     ));
	//   };

	const handleClose = () => {
		onOpenChange(false);
		setTimeout(() => setCurrentView(defaultView), 300);
	};

	//   const handleCheckoutSuccess = (data) => {
	//     setShippingData(data);
	//     setCurrentView('payment');
	//   };

	//   const handlePaymentSuccess = (data) => {
	//     console.log('Order completed:', { ...shippingData, ...data });
	//     setCurrentView('success');
	//     onSuccess?.();
	//   };

	const getTitle = () => {
		switch (currentView) {
			case 'cart':
				return 'Cart';
			case 'checkout':
				return 'Checkout';
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

	const canGoBack = currentView === 'checkout' || currentView === 'payment';

	const handleBack = () => {
		if (currentView === 'payment') setCurrentView('checkout');
		else if (currentView === 'checkout') setCurrentView('cart');
	};

	const renderContent = () => {
		switch (currentView) {
			case 'cart':
				return (
					<CartView
						items={items}
						// onUpdateQuantity={handleUpdateQuantity}
						// onUpdateColor={handleUpdateColor}
					/>
				);

			case 'checkout':
				return '';
			//   <CheckoutView
			//     onSuccess={handleCheckoutSuccess}
			//     isAuthenticated={isAuthenticated}
			//     userEmail={userEmail}
			//   />

			case 'payment':
				return ''; // <PaymentView onSuccess={handlePaymentSuccess} />;

			case 'success':
				return ''; // <SuccessView />;

			default:
				return ''; // <div>Unknown view</div>;
		}
	};

	return (
		<AppDrawer
			title={getTitle()}
			open={open}
			onOpenChange={onOpenChange}
			onClose={handleClose}
			footerButton={
				(currentView === 'cart' ||
					currentView === 'checkout' ||
					currentView === 'payment') &&
				items.length !== 0
					? { label: getButtonLabel(), onClick: () => setCurrentView('checkout') }
					: undefined
			}
			//   showBackButton={canGoBack}
			//   onBack={handleBack}
		>
			{renderContent()}
		</AppDrawer>
	);
}
