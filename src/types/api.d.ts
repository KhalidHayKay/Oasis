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
