import { authService } from '@/services/authService';

let refreshInterval: NodeJS.Timeout | null = null;

export function startTokenRefresh() {
	// Clear any existing interval
	stopTokenRefresh();

	refreshInterval = setInterval(
		async () => {
			try {
				await authService.refreshToken();
				console.log('Token refreshed successfully');
			} catch (error) {
				console.error('Token refresh failed:', error);
			}
		},
		50 * 60 * 1000,
	); // 50 minutes
}

export function stopTokenRefresh() {
	if (refreshInterval) {
		clearInterval(refreshInterval);
		refreshInterval = null;
	}
}
