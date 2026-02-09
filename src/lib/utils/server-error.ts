/**
 * Server-side error handler for secure error serialization
 *
 * IMPORTANT: In production, Next.js does NOT serialize detailed error messages
 * from Server Components to the client for security reasons. This utility allows you
 * to:
 * 1. Catch errors server-side
 * 2. Log full details server-side (logs visible in server terminal)
 * 3. Pass ONLY safe, predetermined messages to the client/error.tsx
 *
 * Never include sensitive info (stack traces, API URLs, auth tokens) in the message
 * passed to the client.
 */

export class SafeServerError extends Error {
	public readonly clientMessage: string;

	constructor(clientMessage: string, serverDetails?: unknown) {
		// Message shown to client
		super(clientMessage);
		this.name = 'SafeServerError';
		this.clientMessage = clientMessage;

		// Log full details server-side only
		if (serverDetails) {
			console.error('[SafeServerError Details]', serverDetails);
		}
	}
}

/**
 * Wrap async server operations to safely handle errors
 */
export async function tryServerOperation<T>(
	operation: () => Promise<T>,
	fallbackMessage: string = 'Failed to load data. Please try again.',
): Promise<T> {
	try {
		return await operation();
	} catch (error) {
		console.error(fallbackMessage, error);

		const message = error instanceof Error ? error.message : String(error);
		throw new SafeServerError(fallbackMessage, { originalError: message });
	}
}
