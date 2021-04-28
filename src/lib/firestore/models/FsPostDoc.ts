export type PostComment = {
  id: string;
  postUid: string;
  name: string;
  email: string;
  body: string;
  timestamp: string;
  replies: PostReply[];
};

export type PostReply = Omit<PostComment, 'id' | 'postUid'>;

export type PostMeta = {
  views: number;
  id: string;
};
