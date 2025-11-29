interface Product {
	id: string;
	name: string;
	description: string;
	price: {
		amount: number;
		currency: string;
	};
	featuredImage: string;
	categories: string[];
	createdAt: string;
	popularity: number;
	// colors: string[];
}
