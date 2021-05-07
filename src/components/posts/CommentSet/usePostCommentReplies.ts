import { PostComment, PostReply } from '@lib/firestore/models/FsPostDoc';
import { PatchPostsCommentReplyResult } from '@src/pages/api/posts/reply';
import axios from 'axios';
import { useState } from 'react';
import { CommentForm } from '../CommentWriter/CommentWriter';

type OnReplySubmit = (data: CommentForm, reset: () => void) => Promise<void>;
export const usePostCommentReplies = (
	comment: PostComment
): [replies: PostReply[], onReplySubmit: OnReplySubmit] => {
	const [replies, setReplies] = useState<PostReply[]>(comment.replies ?? []);

	const onReplySumit: OnReplySubmit = async (data, reset) => {
		const reply: PostReply = {
			...data,
			timestamp: new Date().toISOString(),
			replies: [],
		};

		// NOTE Not a hundred percent sure if this is correct
		const oldReplies = replies;

		// Optimistic update
		setReplies((prev) => [...prev, reply]);

		try {
			await axios.patch<PatchPostsCommentReplyResult>(
				'/api/posts/reply',
				reply,
				{
					params: {
						commentId: comment.id,
					},
				}
			);

			reset();
		} catch (error) {
			// TODO show error modal
			setReplies(oldReplies);
		}
	};

	return [replies, onReplySumit];
};
