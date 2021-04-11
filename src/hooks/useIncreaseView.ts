import { PostsPatchIncreaseView } from '@src/pages/api/posts/increaseViews';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useIncreaseView = (
	postSlug: string | undefined
): number | null => {
	const [views, setViews] = useState<number | null>(null);

	useEffect(() => {
		axios
			.patch<PostsPatchIncreaseView>('/api/posts/increaseViews', {
				slug: postSlug,
			})
			.then((res) => setViews(res.data.data?.views ?? null))
			.catch(() => setViews(null));
	}, [postSlug]);

	return views;
};
