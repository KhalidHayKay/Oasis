import axios, {
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';
import { getValueFromCookie } from './cookie';

export interface ApiResponse<T> {
	data: T;
	message?: string;
	status: number;
}

export const api: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE,
	timeout: 60_000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
	withCredentials: true,
});

/**
 * REQUEST INTERCEPTOR
 */
api.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		// If we are on the Server (SSR)
		if (typeof window === 'undefined') {
			const token = await getValueFromCookie('auth_token');

			console.log(token);

			if (token) {
				const plainToken = decodeURIComponent(token);
				config.headers.Authorization = `Bearer ${plainToken}`;
			}

			config.headers.Referer = process.env.NEXT_PUBLIC_APP_URL;
		}

		return config;
	},
	(error) => Promise.reject(error),
);

/**
 * RESPONSE INTERCEPTOR
 */
api.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error) => {
		//

		return Promise.reject(error);
	},
);

export default api;
