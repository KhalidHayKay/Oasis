'use client';

import { RefreshCw } from 'lucide-react';

export default function Error({
	error,
}: {
	error: Error & { digest?: string };
}) {
	// In dev → error.message has the real message
	// In prod → error.digest has the real message (because we set it)
	const displayMessage = error.digest ?? error.message;

	return (
		<div className='flex min-h-[60vh] items-center justify-center px-4'>
			<div className='bg-card text-card-foreground border border-border rounded-lg p-6 max-w-md w-full shadow-sm animate-in fade-in-50 zoom-in-95 duration-200'>
				<h2 className='text-xl font-semibold mb-2 flex items-center gap-2 text-destructive'>
					Error
				</h2>

				<p className='text-muted-foreground mb-6 wrap-break-word'>
					{displayMessage}
				</p>

				<button
					onClick={() => window.location.reload()}
					className='inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer'
				>
					<RefreshCw className='w-4 h-4' />
					Retry
				</button>
			</div>
		</div>
	);
}
