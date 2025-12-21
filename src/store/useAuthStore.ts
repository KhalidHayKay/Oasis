import { create } from 'zustand';
import { authService } from '@/services/authService';

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
	//   socialLogin: (provider: 'google' | 'apple') => Promise<AuthResponse>;
	logout: () => Promise<string>;
	initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
	// Initial state
	user: null,
	isAuthenticated: false,
	isInitiatingAuth: true,
	message: null,

	initializeAuth: async () => {
		set({ isInitiatingAuth: true });
		try {
			const user = await authService.getUser();
			if (user) {
				set({ user, isAuthenticated: true });
			} else {
				set({ isAuthenticated: false });
			}

			set({ isInitiatingAuth: false });
		} catch {
			set({ isAuthenticated: false, isInitiatingAuth: false });
		}
	},

	login: async (credentials) => {
		try {
			const response = await authService.login(credentials);
			set({
				user: response.user,
				isAuthenticated: true,
			});
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
			return response;
		} catch (error) {
			throw error;
		}
	},

	//   socialLogin: async (provider) => {
	//     set({ isLoading: true, error: null });
	//     try {
	//       const response = await authService.openSocialAuth(provider);
	//       set({
	//         user: response.user,
	//         token: response.token.access,
	//         isAuthenticated: true,
	//         isLoading: false,
	//         error: null,
	//       });
	//     } catch (error) {
	//       set({
	//         isLoading: false,
	//         error: error.message || 'Social login failed',
	//       });
	//       throw error;
	//     }
	//   },

	logout: async () => {
		set({ isInitiatingAuth: true });
		try {
			const response = await authService.logout();
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
}));
