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

	return <>{children}</>;
};

export default AuthInitializer;
