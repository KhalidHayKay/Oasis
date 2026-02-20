'use server';

import { cookies } from 'next/headers';

export const getValueFromCookie = async (key: string) => {
	const cookieStore = await cookies();
	const token = cookieStore.get(key);

	return token?.value;
};
