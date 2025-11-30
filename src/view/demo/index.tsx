'use client';

import { ModalProvider, useModal } from '@/context/ModalContext';
import { Button } from '@/components/ui/button';
import { ModalManager } from '@/components/modal-manager';

// Mock product data - replace with actual data from your API
const mockProduct = {
	id: '1',
	name: 'Lune Armchair - Left Arm Chute',
	price: {
		amount: 899,
		currency: 'USD',
		discount: 60,
	},
	featuredImage: '/images/image.png',
	categories: ['Furniture', 'Armchair'],
	createdAt: new Date().toISOString(),
	popularity: 4.5,
	colors: ['#9B8B7F', '#D4C4B8', '#6B7C8E'],
};

// Mock products for "People Also Viewed" section
const mockRelatedProducts = [
	{
		id: '2',
		name: 'Faux Leaf Chair',
		price: { amount: 129, currency: 'USD', discount: 15 },
		featuredImage: '/images/image.png',
		categories: ['Furniture', 'Chair'],
		createdAt: new Date().toISOString(),
		popularity: 4.2,
		colors: ['#D4A574', '#E8C9B0', '#9B7E6F'],
	},
	{
		id: '3',
		name: 'Boucle Accent Chair',
		price: { amount: 44, currency: 'USD', discount: 25 },
		featuredImage: '/images/image.png',
		categories: ['Furniture', 'Chair'],
		createdAt: new Date().toISOString(),
		popularity: 4.5,
		colors: ['#5B7B9E', '#8FA8C4', '#D4A574'],
	},
	{
		id: '4',
		name: 'Modern Sofa',
		price: { amount: 599, currency: 'USD', discount: 20 },
		featuredImage: '/images/image.png',
		categories: ['Furniture', 'Sofa'],
		createdAt: new Date().toISOString(),
		popularity: 4.7,
		colors: ['#2C3E50', '#34495E', '#7F8C8D'],
	},
	{
		id: '5',
		name: 'Classic Recliner',
		price: { amount: 349, currency: 'USD', discount: 10 },
		featuredImage: '/images/image.png',
		categories: ['Furniture', 'Recliner'],
		createdAt: new Date().toISOString(),
		popularity: 4.1,
		colors: ['#8B7355', '#A0826D', '#C4A69D'],
	},
	{
		id: '6',
		name: 'Elegant Loveseat',
		price: { amount: 459, currency: 'USD', discount: 18 },
		featuredImage: '/images/image.png',
		categories: ['Furniture', 'Loveseat'],
		createdAt: new Date().toISOString(),
		popularity: 4.4,
		colors: ['#D4B8A0', '#8FA8C4', '#5B7B9E'],
	},
];

const DemoView = () => {
	const { openModal } = useModal();

	return (
		<ModalProvider>
			<main className='min-h-screen bg-background'>
				<div className='flex flex-wrap gap-3 justify-center py-12 px-4'>
					<Button onClick={() => openModal('login')} variant='outline'>
						Open Login
					</Button>
					<Button onClick={() => openModal('signup')} variant='outline'>
						Open Signup
					</Button>
					<Button onClick={() => openModal('customer-info')} variant='outline'>
						Open Checkout
					</Button>
				</div>
			</main>
		</ModalProvider>
	);
};

export default DemoView;
