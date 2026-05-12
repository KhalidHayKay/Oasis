'use client';

import { useState } from 'react';

export function useInspirations(inspirations: Inspiration[]) {
    // Show 12 inspirations initially (4 per column on desktop)
    const displaySize = 12;

    const [displayedInspirations, setDisplayedInspirations] = useState<Inspiration[]>(
        inspirations.slice(0, displaySize)
    );

    const hasMore = displayedInspirations.length < inspirations.length;

    const handleShowMore = () => {
        setDisplayedInspirations((prev) => {
            const nextCount = Math.min(prev.length + displaySize, inspirations.length);
            return inspirations.slice(0, nextCount);
        });
    };

    const handleCollapse = () => {
        setDisplayedInspirations(inspirations.slice(0, displaySize));
    };

    return {
        displayedInspirations,
        handleShowMore,
        hasMore,
        handleCollapse,
    };
}
