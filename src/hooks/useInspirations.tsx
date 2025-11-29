'use client';

import { useEffect, useState } from 'react';

export function useInspirations(inspirations: Inspiration[]) {
	const [displayedInspirations, setDisplayedInspirations] = useState<
		Inspiration[]
	>([]);

	const displaySize = 12; // Show 12 inspirations initially (4 per column on desktop)

	const handleShowMore = () => {
		setDisplayedInspirations((prev) => {
			const nextCount = Math.min(prev.length + displaySize, inspirations.length);
			return inspirations.slice(0, nextCount);
		});
	};

	const handleCollapse = () => {
		setDisplayedInspirations(inspirations.slice(0, displaySize));
	};

	const hasMore = displayedInspirations.length < inspirations.length;

	// Reset displayed inspirations when the inspirations array changes (category filter)
	useEffect(() => {
		setDisplayedInspirations(inspirations.slice(0, displaySize));
	}, [inspirations]);

	return {
		displayedInspirations,
		handleShowMore,
		hasMore,
		handleCollapse,
	};
}
