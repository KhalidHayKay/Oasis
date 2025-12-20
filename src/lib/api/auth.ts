let logoutFn: null | (() => void) = null;

export const setLogout = (fn: () => void) => {
	logoutFn = fn;
};

export const triggerLogout = () => {
	if (logoutFn) return logoutFn();
};
