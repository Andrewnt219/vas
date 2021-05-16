import Time from '@components/common/Time/Time';
import { Format } from '@data/common-data';
import { PostComment, PostReply } from '@lib/firestore/models/FsPostDoc';
import { PatchPostsCommentReplyResult } from '@src/pages/api/posts/reply';
import axios from 'axios';
import dayjs from 'dayjs';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import CommentWriter, { CommentForm } from '../CommentWriter/CommentWriter';
import { useActiveComment } from './ActiveCommentContext';

type CommentSetProps = { className?: string; comments: PostComment[] };

function CommentSet({ className, comments }: CommentSetProps) {
  return (
    <ul tw="flex flex-col" className={className}>
      {comments.map((comment) => (
        <li key={comment.timestamp}>
          <Comment comment={comment} />
        </li>
      ))}
    </ul>
  );
}

/* --------------------------------- COMMENT -------------------------------- */
// FIXME a caveat where the replies keep getting indented
// FIXME a caveat where comment count is not updated on success
type Data = PostComment;
type Props = {
  className?: string;
  comment: Data;
};
function Comment({ className, comment }: Props) {
  const { activeWriterId, setActiveWriterId } = useActiveComment();
  const isVisibleWriter = activeWriterId === comment.timestamp;
  const onReplyClick = () => setActiveWriterId(comment.timestamp);

  const onReplySubmit = async (data: CommentForm, reset: () => void) => {
    const reply: PostReply = {
      ...data,
      timestamp: new Date().toISOString(),
      replies: [],
    };

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

      setActiveWriterId(null);

      reset();
    } catch (error) {
      // TODO show error modal
      setActiveWriterId(comment.timestamp);
    }
  };

  const timestamp = dayjs(comment.timestamp);

  return (
    <div tw="flex flex-col">
      <div className={className} tw="flex">
        <FaUserCircle fontSize="60px" />

        <div tw="ml-md flex-1 flex flex-col space-y-3 text-smaller">
          <div>
            <h3 tw="font-black text-xl">{comment.name}</h3>

            <Time time={timestamp} tw="mt-1 text-smaller text-skin-muted">
              {timestamp.format(Format.DATE_TIME)}
            </Time>
          </div>

          <p tw="">{comment.body}</p>

          <button
            onClick={onReplyClick}
            tw="text-skin-muted self-start font-black border border-skin-light px-2 py-1 text-smaller"
          >
            Reply
          </button>
        </div>
      </div>

      {isVisibleWriter && (
        <div aria-expanded={isVisibleWriter}>
          <CommentWriter onFormSubmitted={onReplySubmit} />
        </div>
      )}

      {/* NOTE separate CommentSet to a different folder may need a workaround to avoid circular dependencies on overriding style */}
      <CommentSet
        tw="pl-8 md:pl-20 mt-md"
        comments={comment.replies.map((reply) => ({ ...comment, ...reply }))}
      />
    </div>
  );
}
export default CommentSet;
