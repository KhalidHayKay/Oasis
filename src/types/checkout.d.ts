interface ShippingAddress {
	firstName: string;
	lastName: string;
	phone: string;
	address: string;
	country: string;
	city: string;
}

interface CheckoutSession {
	id: number;
	publicToken: string;
	customerEmail: string;
	userId: number;
	cartId: number;
	shippingAddress: ShippingAddress;
	billingAddress: ShippingAddress;
	stripePaymentIntentId: string | null;
	subtotal: number;
	tax: number;
	shippingFee: number;
	total: number;
	status: 'active' | 'expired' | 'converted';
	currentStep: 'address' | 'payment' | 'summary';
	expiresAt: string;
	createdAt: string;
	updatedAt: string;
	cart: {
		id: string;
		totalPrice: number;
		items: CartItem[];
	};
}
