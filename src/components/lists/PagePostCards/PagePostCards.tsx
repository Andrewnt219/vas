import PostCard from '@components/cards/PostCard/PostCard';
import { SizesProvider } from '@contexts/SizesContext';
import { Post } from '@services/post-service';
import { getSizes } from '@utils/css-utils';
import React from 'react';

type Props = { className?: string; posts: Post[] };

function PagePostCards({ className, posts }: Props) {
  return (
    <ul
      className={className}
      tw="grid gap-6 md:(gap-12) xl:grid-cols-2"
      aria-label="list of articles"
    >
      <SizesProvider
        initialContext={getSizes(['90vw', undefined, '900px', '1600px'])}
      >
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard.Article post={post} />
          </li>
        ))}
      </SizesProvider>
    </ul>
  );
}

export default PagePostCards;
