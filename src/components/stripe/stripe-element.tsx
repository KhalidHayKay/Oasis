import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/utils/stripe';
import { useCheckoutStore } from '@/store/useCheckoutStore';

const StripeElement = ({ children }: { children: React.ReactNode }) => {
	const clientSecret = useCheckoutStore((state) => state.payment?.clientSecret);

	return (
		<Elements
			stripe={stripePromise}
			options={{
				clientSecret,
				appearance: {
					theme: 'flat',
					variables: {
						colorPrimary: '#f97316', // orange-500
						borderRadius: '12px',
						fontFamily: 'Inter, sans-serif',
						fontSizeBase: '16px',
						spacingUnit: '12px',
						colorBackground: '#ffffff',
						colorText: '#000000',
						colorDanger: '#ef4444',
					},
					rules: {
						'.Input': {
							border: '1px solid #e5e7eb', // border-gray-200
							padding: '12px',
							fontSize: '16px',
							borderRadius: '12px',
							backgroundColor: '#ffffff',
							boxShadow: 'none',
						},
						'.Input:focus': {
							border: '1px solid #5f6980',
							boxShadow: '0 0 0 1px #a5a7af',
							outline: '#a5a7af',
							// outline: 'none',
						},
						'.Label': {
							fontSize: '14px',
							fontWeight: '500',
							marginBottom: '8px',
						},
						'.Tab': {
							border: '1px solid #e5e7eb',
							borderRadius: '12px',
						},
						'.Tab--selected': {
							border: '1px solid #f97316',
							backgroundColor: '#fff7ed',
						},
					},
				},
			}}
		>
			{children}
		</Elements>
	);
};

export default StripeElement;
