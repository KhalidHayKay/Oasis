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
	checkoutSession: CheckoutSession;
}

interface PaymentIntentResponse {
	checkoutSession: CheckoutSession;
	clientSecret: string;
	reference: string;
}

// Requests

interface AddToCartRequest {
	product_id: number;
	quantity: number;
	color: string;
}

interface Address {
	shipping_fname: string;
	shipping_lname: string;
	shipping_phone: string;
	shipping_address: string;
	shipping_country: string;
	shipping_city: string;
}

interface CheckoutRequest extends Address {
	checkout_token: string;
}
