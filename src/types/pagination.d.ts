interface PaginationLinks {
	first: string | null;
	last: string | null;
	prev: string | null;
	next: string | null;
}

interface PaginationMeta {
	current_page: number;
	from: number | null;
	last_page: number;
	links: PaginationMetaLink[];
	path: string;
	per_page: number;
	to: number | null;
	total: number;
}

interface PaginationMetaLink {
	url: string | null;
	label: string;
	page: number | null;
	active: boolean;
}
