interface AuthResponse {
	message: string;
	user: User;
}

interface LoginCredentials {
	email: string;
	password: string;
}

interface RegistrationData {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
	terms: boolean;
}

interface VerifyEmailRequest {
	email: string;
	code: string;
}

interface ForgotPasswordRequest {
	email: string;
}

interface ResetPasswordRequest {
	email: string;
	token: string;
	password: string;
	password_confirmation: string;
}
