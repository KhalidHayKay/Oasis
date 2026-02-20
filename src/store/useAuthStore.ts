import { create } from 'zustand';
import { authService } from '@/services/authService';
import { appEvent } from '@/lib/events/appEvent';

interface AuthState {
	// State
	user: User | null;
	isAuthenticated: boolean;
	isInitiatingAuth: boolean;

	// Actions
	login: (credentials: LoginCredentials) => Promise<AuthResponse>;
	register: (data: RegistrationData) => Promise<AuthResponse>;
	verifyEmail: (data: VerifyEmailRequest) => Promise<AuthResponse>;
	//   sendVerificationCode: (email: string) => Promise<AuthResponse>;
	logout: () => Promise<string>;
	initializeAuth: () => Promise<void>;
	exchangeTokenForAuth: (token: string) => Promise<AuthResponse>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
	// Initial state
	user: null,
	isAuthenticated: false,
	isInitiatingAuth: true,

	initializeAuth: async () => {
		try {
			const user = await authService.getUser();

			appEvent.emit('initialized', user);

			set({ user, isAuthenticated: true, isInitiatingAuth: false });
		} catch (error) {
			set({ isAuthenticated: false, isInitiatingAuth: false });
			appEvent.emit('sessionExpired', null);
			console.error('Failed to initialize authentication:', error);
		}
	},

	login: async (credentials) => {
		try {
			const response = await authService.login(credentials);
			set({
				user: response.user,
				isAuthenticated: true,
			});

			appEvent.emit('login', response.user);

			return response;
		} catch (error) {
			throw error;
		}
	},

	register: async (data) => {
		try {
			const response = await authService.register(data);
			set({
				user: response.user,
				isAuthenticated: true,
			});

			return response;
		} catch (error) {
			throw error;
		}
	},

	verifyEmail: async (data: VerifyEmailRequest) => {
		try {
			const response = await authService.verifyEmail(data);
			set({
				user: response.user,
				isAuthenticated: true,
			});

			appEvent.emit('login', response.user);

			return response;
		} catch (error) {
			throw error;
		}
	},

	logout: async () => {
		set({ isInitiatingAuth: true });
		try {
			const response = await authService.logout();

			appEvent.emit('logout', get().user);

			return response.message;
		} catch (error) {
			throw error;
		} finally {
			set({
				user: null,
				isAuthenticated: false,
				isInitiatingAuth: false,
			});
		}
	},

	exchangeTokenForAuth: async (token) => {
		try {
			const response = await authService.exchangeToken(token);
			set({
				user: response.user,
				isAuthenticated: true,
				isInitiatingAuth: false,
			});

			appEvent.emit('login', response.user);

			return response;
		} catch (error) {
			set({ isInitiatingAuth: false });
			throw error;
		}
	},
}));
