'use client';

import { useState } from 'react';
import {
	Package,
	ChevronRight,
	ArrowLeft,
	Calendar,
	MapPin,
	CreditCard,
	CheckCircle2,
	Clock,
	Truck,
	XCircle,
} from 'lucide-react';

// --- Types (Based on your provided Interface) ---

interface Address {
	line1: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
}

interface OrderItem {
	id: number;
	productName: string;
	quantity: number;
	unitPrice: number;
	image: string; // Added for UI
	variant?: string; // e.g. Color
}

interface Order {
	id: number;
	userId: number;
	paymentId: number | null;
	orderNumber: string;
	customerEmail: string;
	shippingAddress: Address;
	billingAddress: Address;
	subtotal: number;
	tax: number;
	shippingFee: number;
	total: number;
	currency: string;
	stripePaymentIntentId: string | null;
	status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
	createdAt: string;
	updatedAt: string;
	items: OrderItem[];
}

// --- Dummy Data ---
const DUMMY_ORDERS: Order[] = [
	{
		id: 1,
		userId: 101,
		paymentId: 55,
		orderNumber: 'ORD-7782-XJ',
		customerEmail: 'user@example.com',
		shippingAddress: {
			line1: '123 Oasis Blvd',
			city: 'Lagos',
			state: 'LA',
			postalCode: '100001',
			country: 'Nigeria',
		},
		billingAddress: {
			line1: '123 Oasis Blvd',
			city: 'Lagos',
			state: 'LA',
			postalCode: '100001',
			country: 'Nigeria',
		},
		subtotal: 1250,
		tax: 100,
		shippingFee: 50,
		total: 1400,
		currency: 'USD',
		stripePaymentIntentId: 'pi_123',
		status: 'shipped',
		createdAt: '2023-10-25T14:30:00Z',
		updatedAt: '2023-10-26T09:00:00Z',
		items: [
			{
				id: 1,
				productName: 'Luxe Armchair - Left Arm',
				quantity: 1,
				unitPrice: 899,
				image:
					'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=300',
				variant: 'Taupe',
			},
			{
				id: 2,
				productName: 'Modern Ceramic Lamp',
				quantity: 2,
				unitPrice: 175.5,
				image:
					'https://images.unsplash.com/photo-1507473888900-52e1adad5481?auto=format&fit=crop&q=80&w=300',
				variant: 'White',
			},
		],
	},
	{
		id: 2,
		userId: 101,
		paymentId: 56,
		orderNumber: 'ORD-9921-MC',
		customerEmail: 'user@example.com',
		shippingAddress: {
			line1: '123 Oasis Blvd',
			city: 'Lagos',
			state: 'LA',
			postalCode: '100001',
			country: 'Nigeria',
		},
		billingAddress: {
			line1: '123 Oasis Blvd',
			city: 'Lagos',
			state: 'LA',
			postalCode: '100001',
			country: 'Nigeria',
		},
		subtotal: 450,
		tax: 45,
		shippingFee: 0,
		total: 495,
		currency: 'USD',
		stripePaymentIntentId: 'pi_124',
		status: 'delivered',
		createdAt: '2023-10-10T10:15:00Z',
		updatedAt: '2023-10-15T16:20:00Z',
		items: [
			{
				id: 3,
				productName: 'Minimalist Coffee Table',
				quantity: 1,
				unitPrice: 450,
				image:
					'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=300',
				variant: 'Oak',
			},
		],
	},
];

// --- Utility Components ---

const FormatCurrency = ({ value }: { value: number }) => (
	<span className='font-mono tracking-tight'>${value.toFixed(2)}</span>
);

const FormatDate = ({ date }: { date: string }) => (
	<span>
		{new Date(date).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		})}
	</span>
);

const StatusBadge = ({ status }: { status: Order['status'] }) => {
	const styles = {
		pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
		processing: 'bg-blue-100 text-blue-700 border-blue-200',
		shipped: 'bg-brand-100 text-brand-800 border-brand-200',
		delivered: 'bg-green-100 text-green-700 border-green-200',
		cancelled: 'bg-red-100 text-red-700 border-red-200',
	};

	return (
		<span
			className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.pending} capitalize`}
		>
			{status}
		</span>
	);
};

// --- Main Components ---

/**
 * 1. Order Status Tracker
 * Visualizes the journey of the order.
 */
const OrderTracker = ({ status }: { status: Order['status'] }) => {
	if (status === 'cancelled') {
		return (
			<div className='bg-red-50 border border-red-100 rounded-lg p-4 flex items-center gap-3 text-red-700 mb-8'>
				<XCircle className='size-5' />
				<span className='font-medium'>This order has been cancelled.</span>
			</div>
		);
	}

	const steps = [
		{ id: 'pending', label: 'Order Placed', icon: Clock },
		{ id: 'processing', label: 'Processing', icon: Package },
		{ id: 'shipped', label: 'Shipped', icon: Truck },
		{ id: 'delivered', label: 'Delivered', icon: CheckCircle2 },
	];

	const currentStepIndex = steps.findIndex((s) => s.id === status);
	// If status not found (edge case), default to 0
	const activeIndex = currentStepIndex === -1 ? 0 : currentStepIndex;

	return (
		<div className='w-full py-6 mb-8'>
			<div className='relative flex items-center justify-between w-full'>
				{/* Progress Bar Background */}
				<div className='absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-grey-200 rounded-full -z-10' />

				{/* Active Progress Bar */}
				<div
					className='absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-800 rounded-full transition-all duration-500 -z-10'
					style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
				/>

				{steps.map((step, index) => {
					const isActive = index <= activeIndex;
					const isCompleted = index < activeIndex;
					const Icon = step.icon;

					return (
						<div
							key={step.id}
							className='flex flex-col items-center gap-2 bg-background px-2'
						>
							<div
								className={`
                  size-8 sm:size-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300
                  ${
																			isActive
																				? 'bg-brand-800 border-brand-800 text-white shadow-md shadow-brand-200'
																				: 'bg-background border-grey-300 text-grey-400'
																		}
                `}
							>
								{isCompleted ? (
									<CheckCircle2 className='size-5' />
								) : (
									<Icon className='size-4 sm:size-5' />
								)}
							</div>
							<span
								className={`text-[10px] sm:text-xs font-medium ${isActive ? 'text-brand-800' : 'text-grey-400'}`}
							>
								{step.label}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

/**
 * 2. Detailed Order View
 * The "Nice UI" for a specific order.
 */
const OrderDetails = ({
	order,
	onBack,
}: {
	order: Order;
	onBack: () => void;
}) => {
	return (
		<div className='animate-in fade-in slide-in-from-right-4 duration-300'>
			{/* Header Navigation */}
			<button
				onClick={onBack}
				className='group flex items-center gap-2 text-sm text-grey-500 hover:text-brand-800 mb-6 transition-colors'
			>
				<ArrowLeft className='size-4 group-hover:-translate-x-1 transition-transform' />
				Back to Orders
			</button>

			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'>
				<div>
					<h1 className='text-2xl sm:text-3xl font-semibold text-foreground flex items-center gap-3'>
						Order #{order.orderNumber}
					</h1>
					<p className='text-grey-500 mt-1 flex items-center gap-2 text-sm'>
						Placed on <FormatDate date={order.createdAt} />
					</p>
				</div>
				<div className='flex items-center gap-3'>
					{/* Action Buttons could go here (Download Invoice, etc) */}
					<button className='px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors'>
						Invoice
					</button>
					<button className='px-4 py-2 bg-brand-800 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors shadow-sm shadow-brand-200'>
						Track Order
					</button>
				</div>
			</div>

			{/* Visual Status Tracker */}
			<OrderTracker status={order.status} />

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				{/* Left Column: Items */}
				<div className='lg:col-span-2 space-y-6'>
					<div className='border border-border rounded-xl overflow-hidden bg-card'>
						<div className='bg-muted/30 px-6 py-4 border-b border-border'>
							<h3 className='font-semibold text-foreground'>
								Items ({order.items.length})
							</h3>
						</div>
						<div className='divide-y divide-border'>
							{order.items.map((item) => (
								<div key={item.id} className='p-6 flex gap-4 sm:gap-6'>
									{/* Image Container matching your system */}
									<div className='relative bg-muted rounded-lg overflow-hidden shrink-0 size-20 sm:size-24 flex items-center justify-center'>
										<img
											src={item.image}
											alt={item.productName}
											className='size-full object-cover'
										/>
									</div>

									<div className='flex-1 flex flex-col justify-between py-1'>
										<div>
											<h4 className='font-medium text-foreground text-lg'>
												{item.productName}
											</h4>
											{item.variant && (
												<p className='text-sm text-grey-500'>{item.variant}</p>
											)}
										</div>
										<div className='flex justify-between items-end mt-2'>
											<p className='text-sm text-grey-600'>Qty: {item.quantity}</p>
											<span className='font-semibold text-brand-800 text-lg'>
												<FormatCurrency value={item.unitPrice} />
											</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Right Column: Summary & Info */}
				<div className='space-y-6'>
					{/* Order Summary Card */}
					<div className='border border-border rounded-xl bg-card p-6 space-y-4'>
						<h3 className='font-semibold text-foreground mb-2'>Order Summary</h3>
						<div className='space-y-2 text-sm'>
							<div className='flex justify-between text-grey-600'>
								<span>Subtotal</span>
								<span>
									<FormatCurrency value={order.subtotal} />
								</span>
							</div>
							<div className='flex justify-between text-grey-600'>
								<span>Shipping</span>
								<span>
									{order.shippingFee === 0 ? (
										'Free'
									) : (
										<FormatCurrency value={order.shippingFee} />
									)}
								</span>
							</div>
							<div className='flex justify-between text-grey-600'>
								<span>Tax</span>
								<span>
									<FormatCurrency value={order.tax} />
								</span>
							</div>
						</div>
						<div className='border-t border-border pt-4 flex justify-between items-center'>
							<span className='font-semibold text-foreground'>Total</span>
							<span className='font-bold text-xl text-brand-800'>
								<FormatCurrency value={order.total} />
							</span>
						</div>
					</div>

					{/* Customer Details Card */}
					<div className='border border-border rounded-xl bg-card p-6 space-y-6'>
						{/* Shipping Address */}
						<div className='flex gap-3'>
							<MapPin className='size-5 text-grey-400 shrink-0 mt-0.5' />
							<div>
								<h4 className='font-medium text-foreground text-sm mb-1'>
									Shipping Address
								</h4>
								<address className='text-sm text-grey-600 not-italic leading-relaxed'>
									{order.shippingAddress.line1}
									<br />
									{order.shippingAddress.city}, {order.shippingAddress.state}{' '}
									{order.shippingAddress.postalCode}
									<br />
									{order.shippingAddress.country}
								</address>
							</div>
						</div>

						{/* Payment Info */}
						<div className='flex gap-3'>
							<CreditCard className='size-5 text-grey-400 shrink-0 mt-0.5' />
							<div>
								<h4 className='font-medium text-foreground text-sm mb-1'>
									Payment Method
								</h4>
								<p className='text-sm text-grey-600'>Visa ending in 4242</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

/**
 * 3. Orders List Page (Overview)
 */
const OrdersList = ({
	onSelectOrder,
}: {
	onSelectOrder: (order: Order) => void;
}) => {
	return (
		<div className='space-y-8 animate-in fade-in duration-500'>
			<div className='flex flex-col gap-2'>
				<h1 className='heading-section'>My Orders</h1>
				<p className='text-grey-600'>Manage and track your recent purchases.</p>
			</div>

			<div className='space-y-4'>
				{DUMMY_ORDERS.map((order) => (
					<div
						key={order.id}
						className='group border border-border bg-card hover:border-brand-300 rounded-xl p-5 transition-all duration-200 hover:shadow-sm cursor-pointer'
						onClick={() => onSelectOrder(order)}
					>
						<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
							{/* Left: Info */}
							<div className='space-y-1'>
								<div className='flex items-center gap-3'>
									<span className='font-semibold text-foreground'>
										{order.orderNumber}
									</span>
									<StatusBadge status={order.status} />
								</div>
								<div className='flex items-center gap-2 text-sm text-grey-500'>
									<Calendar className='size-3.5' />
									<FormatDate date={order.createdAt} />
									<span className='text-grey-300'>•</span>
									<span>{order.items.length} items</span>
								</div>
							</div>

							{/* Middle: Preview Images (Desktop only mostly) */}
							<div className='hidden md:flex items-center gap-[-8px]'>
								{order.items.slice(0, 3).map((item, i) => (
									<div
										key={item.id}
										className='size-10 rounded-full border-2 border-white bg-muted overflow-hidden relative -ml-3 first:ml-0 z-0'
									>
										<img src={item.image} alt='' className='size-full object-cover' />
									</div>
								))}
								{order.items.length > 3 && (
									<div className='size-10 rounded-full border-2 border-white bg-grey-100 flex items-center justify-center text-xs font-medium text-grey-600 -ml-3 z-10'>
										+{order.items.length - 3}
									</div>
								)}
							</div>

							{/* Right: Price & Action */}
							<div className='flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-border'>
								<span className='font-semibold text-lg text-foreground'>
									<FormatCurrency value={order.total} />
								</span>
								<div className='text-brand-800 font-medium text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform'>
									View Details <ChevronRight className='size-4' />
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

// --- Main Page Wrapper ---

export default function OrdersPage() {
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

	return (
		<div className='min-h-screen bg-background p-4 sm:p-8 md:p-12 max-w-7xl mx-auto font-sans'>
			{selectedOrder ? (
				<OrderDetails order={selectedOrder} onBack={() => setSelectedOrder(null)} />
			) : (
				<OrdersList onSelectOrder={setSelectedOrder} />
			)}
		</div>
	);
}
