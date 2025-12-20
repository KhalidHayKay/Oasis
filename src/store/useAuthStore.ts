import { create } from 'zustand';
import { authService } from '@/services/authService';

interface AuthState {
	// State
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;

	// Actions
	login: (credentials: LoginCredentials) => Promise<void>;
	register: (data: RegistrationData) => Promise<void>;
	//   verifyEmail: (data: VerifyEmailRequest) => Promise<void>;
	//   sendVerificationCode: (email: string) => Promise<void>;
	//   socialLogin: (provider: 'google' | 'apple') => Promise<void>;
	logout: () => Promise<void>;
	initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
	// Initial state
	user: null,
	token: null,
	isAuthenticated: false,
	isLoading: true,
	error: null,

	initializeAuth: async () => {
		set({ isLoading: true });
		try {
			const user = await authService.getUser();
			if (user) {
				set({ user, isAuthenticated: true });
			} else {
				set({ isAuthenticated: false });
			}

			set({ isLoading: false });
		} catch (error) {
			set({ isAuthenticated: false, isLoading: false });
		}
	},

	login: async (credentials) => {
		try {
			const response = await authService.login(credentials);
			set({
				user: response.user,
				isAuthenticated: true,
			});
		} catch (error: unknown) {
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
		} catch (error: any) {
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
		} catch (error: any) {
			throw error;
		}
	},

	//   sendVerificationCode: async (email) => {
	//     set({ isLoading: true, error: null });
	//     try {
	//       await authService.sendVerificationCode(email);
	//       set({
	//         isLoading: false,
	//         error: null,
	//       });
	//     } catch (error: any) {
	//       set({
	//         isLoading: false,
	//         error: error.message || 'Failed to send code',
	//       });
	//       throw error;
	//     }
	//   },

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
	//     } catch (error: any) {
	//       set({
	//         isLoading: false,
	//         error: error.message || 'Social login failed',
	//       });
	//       throw error;
	//     }
	//   },

	logout: async () => {
		set({ isLoading: true });
		try {
			await authService.logout();
		} catch (error) {
			console.error('Logout error:', error);
		} finally {
			set({
				user: null,
				isAuthenticated: false,
				isLoading: false,
			});
		}
	},
}));
