import Image from 'next/image';
import CartProduct from '../cart-product';

const CartView = ({ items }: { items: CartItem[] }) => {
	console.log(items);
	if (items.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center py-20'>
				<h2 className='text-xl font-semibold text-shadow-grey-500 mb-4'>
					Your cart is empty
				</h2>
				<Image
					src='/images/Squircle_em.png'
					alt='Empty cart'
					width={200}
					height={200}
				/>
			</div>
		);
	}

	return (
		<>
			{items.map((item) => {
				return <CartProduct key={item.id} item={item} />;
			})}
		</>
	);
};

export default CartView;
