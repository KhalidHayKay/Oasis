interface Blog {
	id: number;
	title: string;
	slug: string;
	description: string;
	coverImage: string;
	hashtags: string[]; // ["#interior-design", "#minimalism"]
	displayTags: string[]; // ["interior-design", "minimalism"]
	createdAt: string;
}

interface BlogDetail extends Blog {
	body: string;
}
