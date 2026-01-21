type AuthEventType = 'login' | 'logout' | 'initialized';
type AuthEventCallback = (user: User | null) => void | Promise<void>;

class AuthEventEmitter {
	private listeners: Map<AuthEventType, Set<AuthEventCallback>> = new Map();

	on(event: AuthEventType, callback: AuthEventCallback) {
		if (!this.listeners.has(event)) {
			this.listeners.set(event, new Set());
		}
		this.listeners.get(event)!.add(callback);

		// Return unsubscribe function
		return () => {
			this.listeners.get(event)?.delete(callback);
		};
	}

	async emit(event: AuthEventType, user: User | null) {
		const callbacks = this.listeners.get(event);
		if (callbacks) {
			await Promise.all(Array.from(callbacks).map((callback) => callback(user)));
		}
	}
}

export const authEvent = new AuthEventEmitter();
