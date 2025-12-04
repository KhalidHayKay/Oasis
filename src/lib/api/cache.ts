import { AxiosRequestConfig } from 'axios';

interface CacheItem<T = unknown> {
	data: T;
	expires: number;
}

const cache = new Map<string, CacheItem>();
const TTL = 30_000;

export function getCacheKey(config: AxiosRequestConfig) {
	return `${config.url}?${JSON.stringify(config.params || {})}`;
}

export function getCached(config: AxiosRequestConfig) {
	if (config.method?.toLowerCase() !== 'get') return null;

	const key = getCacheKey(config);
	const item = cache.get(key);
	if (!item) return null;

	if (Date.now() > item.expires) {
		cache.delete(key);
		return null;
	}

	return item.data;
}

export function setCached<D = unknown>(config: AxiosRequestConfig, data: D) {
	if (config.method?.toLowerCase() !== 'get') return;
	cache.set(getCacheKey(config), { data, expires: Date.now() + TTL });
}
