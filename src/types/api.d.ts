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

// Requests

interface AddToCartRequest {
	productId: number;
	quantity: number;
	color: string;
}

interface Address {
	shipping_fname: string;
	shipping_lname: string;
	shipping_phone: string;
	shipping_address: string;
	shipping_city: string;
	shipping_state: string;
	shipping_lga: string;
}

interface CheckoutRequest extends Address {}
