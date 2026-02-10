import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, Package, Truck, XCircle } from 'lucide-react';

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
								className={cn(
									'size-8 sm:size-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300',
									isActive
										? 'bg-brand-800 border-brand-800 text-white shadow-md shadow-brand-200'
										: 'bg-background border-grey-300 text-grey-400',
								)}
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

export default OrderTracker;
