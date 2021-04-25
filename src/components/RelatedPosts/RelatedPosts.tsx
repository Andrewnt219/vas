import Time from '@components/posts/Time/Time';
import { Post } from '@services/post-service';
import { font } from '@styles/shared-css';
import NextLink from 'next/link';
import React from 'react';

type PostItemProps = {
  data: Post;
};
function PostItem({ data }: PostItemProps) {
  const postData = data.data;
  const postUrl = `/posts/${data.uid ?? ''}`;

  return (
    <article>
      <div tw="relative pb-xs md:pb-sm">
        <NextLink href={postUrl} passHref>
          <a>
            <img
              // TODO recreate enhaned image
              tw="img-absolute absolute!"
              src={postData.thumbnail.url}
              alt={postData.thumbnail.url ?? 'A thumbnail for the post'}
            />
          </a>
        </NextLink>
      </div>

      <header>
        <h1 tw="mt-2 md:mt-4">
          <NextLink href={postUrl} passHref>
            <a>{postData.title}</a>
          </NextLink>
        </h1>
        <Time
          tw="mt-1 block text-white" // important to have block, or weird gap with title
          css={font.subtitle}
          time={data.first_publication_date}
        />
      </header>
    </article>
  );
}
type Props = { className?: string; heading: string; posts: Post[] };

function RelatedPosts({ className, heading = 'Futher reading', posts }: Props) {
  return (
    <section
      aria-label="Related posts"
      className={className}
      tw="bg-skin-dark pt-6 text-2xl pb-1 text-white font-black"
    >
      <h1 tw="mb-5  text-center after:(content block mx-auto mt-3 w-5 h-0.5 bg-primary)">
        {heading}
      </h1>

      <ul tw="px-4">
        {posts.map((post) => (
          <li key={post.id}>
            <PostItem data={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RelatedPosts;
