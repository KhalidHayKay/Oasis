'use client';

import { useState } from 'react';
import { AppDrawer } from '@/components/app-drawer';
import { LoginForm } from '@/components/auth/login';
import { SignupForm } from '@/components/auth/signup';
import { VerifyEmailForm } from '@/components/auth/verify-email';
import { ForgotPasswordForm } from '@/components/auth/forgot-passowrd';
import { ResetPasswordForm } from '@/components/auth/reset-password';

type AuthView =
	| 'login'
	| 'signup'
	| 'verify-email'
	| 'forgot-password'
	| 'reset-password';

interface AuthDrawerProps {
	trigger: React.ReactNode;
	defaultView?: AuthView;
	onSuccess?: () => void;
}

export function AuthDrawer({
	trigger,
	defaultView = 'login',
	onSuccess,
}: AuthDrawerProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [currentView, setCurrentView] = useState<AuthView>(defaultView);
	const [email, setEmail] = useState('');
	const [resetToken, setResetToken] = useState('');

	const handleClose = () => {
		setIsOpen(false);
		// Reset to default view after closing
		setTimeout(() => setCurrentView(defaultView), 300);
	};

	const handleSuccess = () => {
		onSuccess?.();
		handleClose();
	};

	const getTitle = () => {
		switch (currentView) {
			case 'login':
				return 'Login';
			case 'signup':
				return 'Create Account';
			case 'verify-email':
				return 'Verify Email';
			case 'forgot-password':
				return 'Forgot Password';
			case 'reset-password':
				return 'Reset Password';
			default:
				return 'Authentication';
		}
	};

	const renderContent = () => {
		switch (currentView) {
			case 'login':
				return (
					<LoginForm
						onSuccess={handleSuccess}
						onForgotPassword={() => setCurrentView('forgot-password')}
						onSwitchToSignup={() => setCurrentView('signup')}
					/>
				);

			case 'signup':
				return (
					<SignupForm
						onSuccess={handleSuccess}
						onSwitchToLogin={() => setCurrentView('login')}
						onNeedVerification={(userEmail: string) => {
							setEmail(userEmail);
							setCurrentView('verify-email');
						}}
					/>
				);

			case 'verify-email':
				return (
					<VerifyEmailForm
						email={email}
						onSuccess={handleSuccess}
						onBack={() => setCurrentView('login')}
					/>
				);

			case 'forgot-password':
				return (
					<ForgotPasswordForm
						// onSuccess={(userEmail: string) => {
						// 	setEmail(userEmail);
						// In a real app, you'd get the token from email
						// For now, we'll assume the user follows the email link
						// which would open the app with the token in the URL
						// 	setCurrentView('login');
						// }}
						onBack={() => setCurrentView('login')}
					/>
				);

			case 'reset-password':
				return (
					<ResetPasswordForm
						email={email}
						token={resetToken}
						onSuccess={() => setCurrentView('login')}
					/>
				);

			default:
				return null;
		}
	};

	return (
		<AppDrawer
			trigger={trigger}
			title={getTitle()}
			open={isOpen}
			onOpenChange={setIsOpen}
			onClose={handleClose}
		>
			{renderContent()}
		</AppDrawer>
	);
}
