let logoutFn: null | (() => void) = null;

export const setLogout = (fn: () => void) => {
	logoutFn = fn;
};

export const triggerLogout = () => {
	if (logoutFn) return logoutFn();

	if (typeof window !== 'undefined') {
		localStorage.removeItem('authToken');
		window.location.href = '/login';
	}
};

export const getToken = () => {
	if (typeof window === 'undefined') return null;
	return localStorage.getItem('authToken');
};
