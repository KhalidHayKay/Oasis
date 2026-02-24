'use client';

import { useEffect } from 'react';
import { setLogout } from '@/lib/api/auth';
import { useAuthStore } from '@/store/useAuthStore';
import { mountAppEventHandlers } from '@/lib/events/appEventHandler';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

let isSetup = false;
if (!isSetup) {
	mountAppEventHandlers();
	isSetup = true;
}

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
	const initializeAuth = useAuthStore((state) => state.initializeAuth);
	const logout = useAuthStore((state) => state.logout);
	const exchangeTokenForAuth = useAuthStore(
		(state) => state.exchangeTokenForAuth,
	);

	const router = useRouter();

	useEffect(() => {
		const handleOAuthCallback = async () => {
			const params = new URLSearchParams(window.location.search);
			const exchangeToken = params.get('exchange_token');
			const error = params.get('error');

			const cleanUrl = () => {
				window.history.replaceState(null, '', window.location.pathname);
			};

			// Handle error
			if (error) {
				toast.error(`Authentication failed: ${error}`);
				cleanUrl();
				return;
			}

			// Handle OAuth exchange
			if (exchangeToken) {
				try {
					const response = await exchangeTokenForAuth(exchangeToken);

					cleanUrl();

					toast.success(response.message);

					sessionStorage.removeItem('authPending');
					sessionStorage.removeItem('authReturnPath');
				} catch (err) {
					console.error('Exchange failed:', err);
					toast.error('Authentication failed. Please try again.');
					cleanUrl();
				}

				return;
			}

			// Normal initialization
			initializeAuth();
		};

		handleOAuthCallback();
		setLogout(logout);
	}, [, router, initializeAuth, logout, exchangeTokenForAuth]);

	return <>{children}</>;
};

export default AuthInitializer;
