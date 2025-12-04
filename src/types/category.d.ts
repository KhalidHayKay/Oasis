interface Category {
	id: string;
	name: string;
	slug: string;
	description: string;
	image: string;
	productCount?: number;
	tags?: Tag[];
}

interface Tag {
	id: string;
	name: string;
	slug: string;
	productCount?: number;
}
