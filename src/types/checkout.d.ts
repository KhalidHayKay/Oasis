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
	public_token: string;
	customer_email: string;
	user_id: number;
	cart_id: number;
	shipping_address: ShippingAddress;
	status: string;
	expires_at: string;
	created_at: string;
	updated_at: string;
}
