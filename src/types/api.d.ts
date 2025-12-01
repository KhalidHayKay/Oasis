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

interface categoryContentResponse {
	category: Category;
	tags: Tag[];
	products: Product[];
	relatedProducts: Product[];
}
