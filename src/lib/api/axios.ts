import axios, {
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';
import { getToken, triggerLogout } from './auth';

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
});

/**
 * REQUEST INTERCEPTOR
 */
api.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// SSR check
		if (typeof window !== 'undefined') {
			const token = getToken();
			if (token) {
				config.headers = config.headers || {};
				config.headers.Authorization = `Bearer ${token}`;
			}
		}

		return config;
	},
	(error) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR
 */
api.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error) => {
		// Auto logout on 401
		if (error.response?.status === 401) {
			triggerLogout();
		}

		return Promise.reject(error);
	}
);

export default api;
