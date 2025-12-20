import routes from '@/config/routes';
import { http } from '@/lib/api/http';

export const authService = {
	async getUser() {
		const res: { data: User } = await http.get(routes.api.auth.me);
		return res.data;
	},

	async login(credentials: LoginCredentials) {
		const res: AuthResponse = await http.post(routes.api.auth.login, credentials);
		return res;
	},

	async register(data: RegistrationData) {
		const res: AuthResponse = await http.post(routes.api.auth.register, data);
		return res;
	},

	async verifyEmail(data: VerifyEmailRequest) {
		const res: AuthResponse = await http.post(routes.api.auth.register, data);
		return res;
	},

	async logout() {
		await http.post(routes.api.auth.logout);
	},
};
