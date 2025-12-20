import axios from 'axios';

export const handleApiError = (error: unknown): never => {
	if (axios.isAxiosError(error)) {
		const status = error.response?.status;
		const serverMessage = error.response?.data?.message;

		// Laravel validation errors
		if (status === 422 && error.response?.data?.errors) {
			const first = Object.values(error.response.data.errors)[0];
			if (Array.isArray(first)) throw new Error(first[0]);
		}

		// Unauthorized (401)
		if (status === 401) {
			throw new Error(
				serverMessage ?? 'Your session has expired. Please log in again.'
			);
		}

		// Forbidden (403)
		if (status === 403) {
			throw new Error(
				serverMessage ?? 'You don’t have permission to perform this action.'
			);
		}

		// Not Found (404)
		if (status === 404) {
			throw new Error('The requested resource was not found.');
		}

		// Server errors
		if (status && status >= 500) {
			throw new Error('Something went wrong on our end. Try again later.');
		}

		// Network Offline
		if (error.request && !error.response) {
			throw new Error('Network error. Check your internet connection.');
		}

		// Fallback
		throw new Error(serverMessage || 'Something went wrong. Please try again.');
	}

	// Non-Axios errors
	throw new Error('Unexpected error occurred.');
};
