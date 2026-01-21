interface ShippingAddress {
	name: string;
	phone: string;
	address: string;
	city: string;
	state: string;
	lga: string;
}

interface CheckoutSession {
	id: number;
	publicToken: string;
	customerEmail: string;
	userId: number;
	cartId: number;
	shippingAddress: ShippingAddress;
	status: string;
	expiresAt: string;
	createdAt: string;
	updatedAt: string;
}
