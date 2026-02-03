import { appEvent } from './appEvent';
import { useCartStore } from '@/store/useCartStore';
import { useCheckoutStore } from '@/store/useCheckoutStore';
import { toast } from 'sonner';
import { startTokenRefresh, stopTokenRefresh } from '../auth/token-refresh';

export function mountAppEventHandlers() {
	// Cart event handlers
	appEvent.on('login', async () => {
		try {
			await useCartStore.getState().syncGuestCartToBackend();
		} catch (error) {
			console.error('Cart sync failed:', error);
			toast.error('Cart sync failed. Please refresh the page.', {
				duration: 2000,
			});
		}
	});

	appEvent.on('initialized', async () => {
		const { hasSyncedOnLogin, syncGuestCartToBackend, loadCartFromBackend } =
			useCartStore.getState();

		try {
			if (!hasSyncedOnLogin) {
				await syncGuestCartToBackend();
			} else {
				await loadCartFromBackend();
			}
		} catch (error) {
			console.error('Failed to load cart on auth init:', error);
			toast.error('Failed to load cart. Please refresh the page.', {
				duration: 2000,
			});
		}
	});

	appEvent.on('logout', () => {
		useCartStore.setState({ items: [] });
		useCartStore.getState().resetSyncFlag();
	});

	appEvent.on('sessionExpired', () => {
		useCartStore.getState().resetSyncFlag();
	});

	appEvent.on('checkoutCompleted', () => {
		useCartStore.setState({ items: [] });
		useCartStore.getState().resetSyncFlag();
	});

	// Checkout event handlers
	const pullSesh = async (user: User | null) => {
		if (user) {
			try {
				await useCheckoutStore.getState().getCheckoutSession();
			} catch (error) {
				console.error('Failed to load checkout session:', error);
			}
		}
	};

	appEvent.on('login', (user) => pullSesh(user));

	appEvent.on('initialized', (user) => pullSesh(user));

	appEvent.on('logout', () => {
		useCheckoutStore.setState({ session: null, payment: null });
	});

	appEvent.on('sessionExpired', () => {
		useCheckoutStore.setState({ session: null, payment: null });
	});

	appEvent.on('checkoutCompleted', () => {
		useCheckoutStore.setState({ session: null, payment: null });
	});

	// Refresh token handlers
	appEvent.on('login', () => {
		startTokenRefresh();
	});

	appEvent.on('initialized', () => {
		startTokenRefresh();
	});

	appEvent.on('logout', () => {
		stopTokenRefresh();
	});

	appEvent.on('sessionExpired', () => {
		stopTokenRefresh();
	});
}
