import axios from 'axios';

export const handleApiError = (error: unknown): never => {
	if (axios.isAxiosError(error)) {
		const status = error.response?.status;
		const message = error.response?.data?.message;

		// Laravel validation errors
		if (status === 422 && error.response?.data?.errors) {
			const first = Object.values(error.response.data.errors)[0];
			if (Array.isArray(first)) throw new Error(first[0]);
		}

		if (status === 404) throw new Error(message || 'Resource not found');
		if (status === 403) throw new Error(message || 'Not allowed');
		if (status === 401) throw new Error(message || 'Unauthenticated');
		if (status! >= 500) throw new Error('Server error. Try again later.');

		// Network issues
		if (error.request && !error.response) {
			throw new Error('Network error. Check your connection.');
		}

		throw new Error(message || 'Something went wrong');
	}

	throw new Error('Unexpected error');
};
