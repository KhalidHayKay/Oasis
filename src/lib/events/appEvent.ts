type AppEventType =
	| 'login'
	| 'logout'
	| 'initialized'
	| 'sessionExpired'
	| 'checkoutCompleted';
type AppEventCallback = (user: User | null) => void | Promise<void>;

class AppEventEmitter {
	private listeners: Map<AppEventType, Set<AppEventCallback>> = new Map();

	on(event: AppEventType, callback: AppEventCallback) {
		if (!this.listeners.has(event)) {
			this.listeners.set(event, new Set());
		}
		this.listeners.get(event)!.add(callback);

		// Return unsubscribe function
		return () => {
			this.listeners.get(event)?.delete(callback);
		};
	}

	async emit(event: AppEventType, user: User | null) {
		const callbacks = this.listeners.get(event);
		if (callbacks) {
			await Promise.all(Array.from(callbacks).map((callback) => callback(user)));
		}
	}
}

export const appEvent = new AppEventEmitter();
