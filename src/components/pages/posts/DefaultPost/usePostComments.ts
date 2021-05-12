import { PostComment } from '@lib/firestore/models/FsPostDoc';
import { PatchPostsCommentResult } from '@src/pages/api/posts/comment';
import { Post } from '@src/server/services/post-service';
import axios from 'axios';
import { useState } from 'react';
import { CommentForm } from '../CommentWriter/CommentWriter';

type OnCommentSubmit = (data: CommentForm, reset: () => void) => Promise<void>;
export const usePostComments = (
  post: Post
): [comments: PostComment[], onCommentSubmit: OnCommentSubmit] => {
  const [comments, setComments] = useState<PostComment[]>(post.comments ?? []);

  const onCommentSubmitted: OnCommentSubmit = async (data, reset) => {
    if (!post.uid) {
      return;
    }

    const comment: Omit<PostComment, 'id'> = {
      ...data,
      postUid: post.uid,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    // NOTE Not a hundred percent sure if this is correct
    const oldComments = comments;

    try {
      const { data } = await axios.patch<PatchPostsCommentResult>(
        '/api/posts/comment',
        comment
      );

      const addedComment = data.data;
      setComments((prev) => [...prev, addedComment]);

      reset();
    } catch (error) {
      // TODO show error modal
      setComments(oldComments);
    }
  };

  return [comments, onCommentSubmitted];
};
