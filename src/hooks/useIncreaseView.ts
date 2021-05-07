import { PatchPostsIncreaseView } from '@src/pages/api/posts/increaseViews';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useIncreaseView = (postID: string | undefined): number | null => {
	const [views, setViews] = useState<number | null>(null);

	useEffect(() => {
		axios
			.patch<PatchPostsIncreaseView>('/api/posts/increaseViews', {
				id: postID,
			})
			.then((res) => setViews(res.data.data?.views ?? null))
			.catch(() => setViews(null));
	}, [postID]);

	return views;
};
