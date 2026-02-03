interface PaginatedResponse<T> {
	data: T[];
	links: PaginationLinks;
	meta: PaginationMeta;
}

interface TopProductResponse {
	data: Product[];
}

interface InspirationResponse {
	data: Inspiration[];
}

interface ProductDetailsResponse {
	product: ProductDetails;
	relatedProducts: Product[];
}

interface CategoriesResponse {
	data: Category[];
}

interface CategoryContentResponse {
	category: Category;
	tags: Tag[];
	products: Product[];
	relatedProducts: Product[];
}

interface CategoryTagResponse {
	data: Category[];
}

interface CheckoutResponse {
	success: boolean;
	session: CheckoutSession;
}

interface PaymentIntentResponse {
	clientSecret: string;
	reference: string;
}

interface PaymentConfirmResponse {
	status: 'pending' | 'successful' | 'failed' | 'cancelled';
	orderId: string;
	error: string | null;
	error;
}

// Requests

interface AddToCartRequest {
	product_id: number;
	quantity: number;
	color: string;
}

interface Address {
	fname: string;
	lname: string;
	phone: string;
	address: string;
	country: string;
	city: string;
}

interface CheckoutRequest extends Address {
	checkout_token: string;
}
