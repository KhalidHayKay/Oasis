'use client';

import { useEffect } from 'react';
import { setLogout } from '@/lib/api/auth';
import { useAuthStore } from '@/store/useAuthStore';

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
	const initializeAuth = useAuthStore((state) => state.initializeAuth);
	const logout = useAuthStore((state) => state.logout);

	useEffect(() => {
		// Initialize auth on mount
		initializeAuth();

		// Set logout function for axios interceptor
		setLogout(logout);
	}, [initializeAuth, logout]);

	return <>{children}</>;
};

export default AuthInitializer;
