'use client';

import { useEffect } from 'react';
import { setLogout } from '@/lib/api/auth';
import { useAuthStore } from '@/store/useAuthStore';
import { mountAppEventHandlers } from '@/lib/events/appEventHandler';

let isSetup = false;
if (!isSetup) {
	mountAppEventHandlers();
	isSetup = true;
}

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
	const initializeAuth = useAuthStore((state) => state.initializeAuth);
	const logout = useAuthStore((state) => state.logout);

	useEffect(() => {
		initializeAuth();
		setLogout(logout);
	}, [initializeAuth, logout]);

	useEffect(() => {
		const handleMessage = async (event: MessageEvent) => {
			if (event.origin !== process.env.NEXT_PUBLIC_API_BASE) return;

			if (event.data.success) {
				useAuthStore.getState().onSocialAuthSuccess();
				useAuthStore.getState().initializeAuth();
			}
		};

		window.addEventListener('message', handleMessage);

		return () => {
			window.removeEventListener('message', handleMessage);
		};
	}, []);

	return <>{children}</>;
};

export default AuthInitializer;
