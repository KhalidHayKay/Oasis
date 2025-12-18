export interface AuthToken {
	access: string;
	type: 'Bearer';
}

export interface AuthResponse {
	message: string;
	user: User;
	token: AuthToken;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterCredentials {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
	terms: boolean;
}

export interface VerifyEmailRequest {
	email: string;
	code: string;
}

export interface ForgotPasswordRequest {
	email: string;
}

export interface ResetPasswordRequest {
	email: string;
	token: string;
	password: string;
	password_confirmation: string;
}
