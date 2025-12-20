import axios, {
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';
import { triggerLogout } from './auth';

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
	(config: InternalAxiosRequestConfig) => {
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
		//

		return Promise.reject(error);
	}
);

export default api;
