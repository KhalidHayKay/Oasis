import { cookies } from 'next/headers';
import api from './axios';
import { handleApiError } from './handle-error';
import { SafeServerError } from '@/lib/utils/server-error';

/**
 * Server-side HTTP client that automatically injects auth cookies
 * AND sanitizes errors for production safety.
 *
 * All errors are:
 * - Logged with full details server-side (visible in terminal)
 * - Converted to SafeServerError for client (generic message)
 *
 * Use this ONLY in Server Components
 */
export const httpServer = {
	get: async <T>(url: string, params?: object): Promise<T> => {
		try {
			const cookieStore = await cookies();
			const cookieString = cookieStore
				.getAll()
				.map((c) => `${c.name}=${c.value}`)
				.join('; ');

			const res = await api.get(url, {
				params,
				headers: cookieString ? { Cookie: cookieString } : {},
			});
			return res.data;
		} catch (err) {
			// try {
			handleApiError(err);
			// } catch (normalizedErr) {
			// 	console.error(`[GET ${url}]`, normalizedErr);
			// 	const errMessage =
			// 		normalizedErr instanceof Error
			// 			? normalizedErr.message
			// 			: 'Failed to load data. Try again';
			// 	throw new SafeServerError(errMessage);
			// }
			throw err;
		}
	},

	post: async <T, D = unknown>(url: string, data?: D): Promise<T> => {
		try {
			const cookieStore = await cookies();
			const cookieString = cookieStore
				.getAll()
				.map((c) => `${c.name}=${c.value}`)
				.join('; ');

			const res = await api.post(url, data, {
				headers: cookieString ? { Cookie: cookieString } : {},
			});
			return res.data;
		} catch (err) {
			try {
				handleApiError(err);
			} catch (normalizedErr) {
				console.error(`[POST ${url}]`, normalizedErr);
				throw new SafeServerError('Failed to process request. Please try again.');
			}
			throw err;
		}
	},

	put: async <T, D = unknown>(url: string, data?: D): Promise<T> => {
		try {
			const cookieStore = await cookies();
			const cookieString = cookieStore
				.getAll()
				.map((c) => `${c.name}=${c.value}`)
				.join('; ');

			const res = await api.post(
				url,
				{ ...data, _method: 'PUT' },
				{
					headers: cookieString ? { Cookie: cookieString } : {},
				},
			);
			return res.data;
		} catch (err) {
			try {
				handleApiError(err);
			} catch (normalizedErr) {
				console.error(`[PUT ${url}]`, normalizedErr);
				throw new SafeServerError('Failed to update. Please try again.');
			}
			throw err;
		}
	},

	patch: async <T, D = unknown>(url: string, data?: D): Promise<T> => {
		try {
			const cookieStore = await cookies();
			const cookieString = cookieStore
				.getAll()
				.map((c) => `${c.name}=${c.value}`)
				.join('; ');

			const res = await api.patch(url, data, {
				headers: cookieString ? { Cookie: cookieString } : {},
			});
			return res.data;
		} catch (err) {
			try {
				handleApiError(err);
			} catch (normalizedErr) {
				console.error(`[PATCH ${url}]`, normalizedErr);
				throw new SafeServerError('Failed to update. Please try again.');
			}
			throw err;
		}
	},

	delete: async <T>(url: string): Promise<T> => {
		try {
			const cookieStore = await cookies();
			const cookieString = cookieStore
				.getAll()
				.map((c) => `${c.name}=${c.value}`)
				.join('; ');

			const res = await api.delete(url, {
				headers: cookieString ? { Cookie: cookieString } : {},
			});
			return res.data;
		} catch (err) {
			try {
				handleApiError(err);
			} catch (normalizedErr) {
				console.error(`[DELETE ${url}]`, normalizedErr);
				throw new SafeServerError('Failed to delete. Please try again.');
			}
			throw err;
		}
	},
};
