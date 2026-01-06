import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';

const CartProduct = ({ item }: { item: CartItem }) => {
	const updateQuantity = useCartStore((state) => state.updateQuantity);

	const { productName, productDesc, productImage, unitPrice, color, quantity } =
		item;

	const handleIncrement = async () => {
		await updateQuantity(item, item.quantity + 1);
	};

	const handleDecrement = async () => {
		await updateQuantity(item, item.quantity - 1);
	};

	return (
		<div className='grid grid-cols-[1fr_2fr] items-center gap-x-5'>
			<div className='relative bg-muted rounded-lg overflow-hidden aspect-square flex items-center justify-center h-full w-full'>
				<Image
					width={600}
					height={400}
					src={productImage.src}
					alt={productImage.alt}
					className='object-cover'
				/>
			</div>
			<div className='flex flex-col h-full justify-around gap-y-3'>
				<div className='flex justify-between sm:flex-col gap-1'>
					<h1 className='text-lg md:text-xl font-medium sm:font-semibold text-foreground'>
						{productName}
					</h1>
					<p className='hidden sm:block text-grey-600 text-sm leading-relaxed'>
						{productDesc}
					</p>
					<span className='text-base sm:text-xl font-medium sm:font-semibold text-brand-800 mt-1'>
						${unitPrice}
					</span>
				</div>

				<div className='flex flex-row products-center justify-between py-3'>
					{/* Color Selection */}
					<div className='flex flex-col gap-3'>
						<button
							className='size-5 rounded-xl border-2 transition-all border-border'
							style={{ backgroundColor: color }}
						/>
					</div>
					{/* Quantity Selector */}
					<div className='flex border border-border rounded-lg'>
						<button
							onClick={handleDecrement}
							className='px-2 py-1 hover:bg-muted transition-colors'
							aria-label='Decrease quantity'
						>
							−
						</button>
						<span className='px-2 py-1 min-w-7 text-center font-medium'>
							{quantity}
						</span>
						<button
							onClick={handleIncrement}
							className='px-2 py-1 hover:bg-muted transition-colors'
							aria-label='Increase quantity'
						>
							+
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartProduct;
