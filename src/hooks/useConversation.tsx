'use client';

import { useMemo, useState } from 'react';

export function useConversations() {
	const [filter, setFilter] = useState<'all' | 'private' | 'group'>('all');
	const [searchText, setSearchText] = useState('foo bar');

	return {
		filter,
		setFilter,
		searchText,
		setSearchText,
	};
}
