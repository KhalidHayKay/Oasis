'use client';

import { useEffect } from 'react';
import { setLogout } from '@/lib/api/auth';
import { useAuthStore } from '@/store/useAuthStore';
import { mountAppEventHandlers } from '@/lib/events/appEventHandler';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';

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
	const searchParams = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		const handleOAuthCallback = async () => {
			const exchangeToken = searchParams.get('exchange_token');
			const error = searchParams.get('error');

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
				console.log('🔄 Exchanging token...');

				try {
					// Exchange for HttpOnly cookie via API
					const response = await exchangeTokenForAuth(exchangeToken);

					// Clean URL
					cleanUrl();

					toast.success(response.message);

					// Cleanup
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
	}, [searchParams, router, initializeAuth, logout, exchangeTokenForAuth]);

	return <>{children}</>;
};

export default AuthInitializer;
