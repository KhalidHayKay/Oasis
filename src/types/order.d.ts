interface OrderItem {
	id: number;
	productId: number;
	productName: string;
	productImage: ProductImage;
	color: string;
	unitPrice: number;
	quantity: number;
}

interface OrderPreview {
	id: number;
	orderNumber: string;
	total: number;
	currency: string;
	status: 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
	createdAt: string;
	itemsLength: number;
	productImages: {
		src: string;
		alt: string;
	}[];
}

interface Order {
	id: number;
	userId: number;
	orderNumber: string;
	customerEmail: string;
	shippingAddress: Address;
	billingAddress: Address;
	subtotal: number;
	tax: number;
	shippingFee: number;
	total: number;
	currency: string;
	status: 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
	createdAt: string;
	paymentRef: string;
	items: OrderItem[];
}
