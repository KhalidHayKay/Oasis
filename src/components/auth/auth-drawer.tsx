'use client';

import { useEffect, useState } from 'react';
import { AppDrawer } from '@/components/app-drawer';
import { LoginForm } from '@/components/auth/login';
import { SignupForm } from '@/components/auth/signup';
import { VerifyEmailForm } from '@/components/auth/verify-email';
import { ForgotPasswordForm } from '@/components/auth/forgot-passowrd';
import { ResetPasswordForm } from '@/components/auth/reset-password';

export type AuthView = 'login' | 'signup' | 'verify-email' | 'forgot-password' | 'reset-password';

interface AuthDrawerProps {
    state: { open: boolean; entry: AuthView };
    onClose: () => void;
    onSuccess?: () => void;
    userEmail?: string; // For verify-email view
}

export function AuthDrawer({ state, onClose, onSuccess, userEmail = '' }: AuthDrawerProps) {
    const [currentView, setCurrentView] = useState<AuthView>(state.entry);
    const [email, setEmail] = useState(userEmail);

    useEffect(() => {
        if (state.open) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCurrentView(state.entry);
        }
    }, [state.open, state.entry]);

    const handleSuccess = () => {
        onSuccess?.();
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
                        onSuccess={(userEmail: string) => {
                            setEmail(userEmail);
                            setCurrentView('verify-email');
                        }}
                        onSwitchToLogin={() => setCurrentView('login')}
                    />
                );

            case 'verify-email':
                return <VerifyEmailForm email={email} onSuccess={handleSuccess} />;

            case 'forgot-password':
                return (
                    <ForgotPasswordForm
                        onSuccess={(userEmail: string) => {
                            setEmail(userEmail);
                            setCurrentView('reset-password');
                        }}
                        onBack={() => setCurrentView('login')}
                    />
                );

            case 'reset-password':
                return (
                    <ResetPasswordForm
                        email={email}
                        onSuccess={() => {
                            setCurrentView('login');
                        }}
                        onReRequest={() => { setCurrentView('forgot-password') }}
                    />
                );

            default:
                return <span>No auth view set</span>;
        }
    };

    return (
        <AppDrawer title={getTitle()} open={state.open} onClose={onClose} onOpenChange={onClose}>
            {renderContent()}
        </AppDrawer>
    );
}
