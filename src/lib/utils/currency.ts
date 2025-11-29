const codeSymbolMap: { [key: string]: string } = {
	USD: '$',
	EUR: '€',
	GBP: '£',
	JPY: '¥',
	CAD: 'C$',
	NGN: '₦',
	INR: '₹',
	AUD: 'A$',
	CHF: 'CHF',
	CNY: '¥',
};

const currency = {
	code: (currencyCode: string = 'USD'): string => {
		return codeSymbolMap[currencyCode.toUpperCase()] || '#';
	},
};

export default currency;
