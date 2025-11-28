import api from './axios';
import { handleApiError } from './handle-error';

export const http = {
	get: async <T>(url: string, params?: object): Promise<T> => {
		try {
			const res = await api.get(url, { params });
			return res.data;
		} catch (err) {
			handleApiError(err);
			throw err;
		}
	},

	post: async <T>(url: string, data?: any): Promise<T> => {
		try {
			const res = await api.post(url, data);
			return res.data;
		} catch (err) {
			handleApiError(err);
			throw err;
		}
	},

	put: async <T>(url: string, data?: any): Promise<T> => {
		try {
			const res = await api.put(url, data);
			return res.data;
		} catch (err) {
			handleApiError(err);
			throw err;
		}
	},

	delete: async <T>(url: string): Promise<T> => {
		try {
			const res = await api.delete(url);
			return res.data;
		} catch (err) {
			handleApiError(err);
			throw err;
		}
	},
};
