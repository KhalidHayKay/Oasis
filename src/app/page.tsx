import HomeView from '@/view/home';

export default function Page() {
	const categories = [
		{
			id: 1,
			name: 'Sitting Room',
			image: '/images/image.png',
		},
		{
			id: 2,
			name: 'Accessories',
			image: '/green-plant-in-pot.jpg',
		},
		{
			id: 3,
			name: 'Kitchen',
			image: '/red-kettle-teapot.jpg',
		},
		{
			id: 4,
			name: 'Bedroom',
			image: '/wooden-nightstand.jpg',
		},
	];

	return <HomeView categories={categories} />;
}
