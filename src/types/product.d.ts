interface Product {
	id: number;
	name: string;
	price: {
		amount: number;
		currency: string;
		discount: number;
	};
	featuredImage: ProductImage;
	category: string;
	tags: string[];
	createdAt: string;
	popularity: number;
	colors: string[];
}

interface ProductDetails extends Product {
	description: string;
	images: ProductImage[];
	rating: number;
}
