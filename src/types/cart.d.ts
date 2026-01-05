// interface Cart {

// }

interface CartItem {
	id: number;
	productId: number;
	productName: string;
	productImage: ProductImage;
	productDesc: string;
	color: string;
	unitPrice: string;
	quantity: number;
	subtotal: string;
}

interface AddToCartRequest {
	product_id: number;
	quantity: number;
	color: string;
}
