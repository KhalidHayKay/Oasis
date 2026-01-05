import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const processDiscount = (price: { amount: number; discount: number }) =>
	Math.round(price.amount * (1 - price.discount / 100));
