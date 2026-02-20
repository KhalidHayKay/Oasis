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

const isServer = typeof window === 'undefined';

export const api: AxiosInstance = axios.create({
	// 1. If Client: use proxy. If Server: use the full backend URL.
	baseURL: isServer ? process.env.NEXT_PUBLIC_API_BASE : '/api/proxy',
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
		if (isServer) {
			const token = await getValueFromCookie('auth_token');

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
