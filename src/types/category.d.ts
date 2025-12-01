interface Category {
	id: string;
	name: string;
	slug: string;
	description: string;
	productCount: number;
	tags: Tag[];
}

interface Tag {
	id: string;
	name: string;
	slug: string;
}
