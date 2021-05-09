import { Label } from '@components/Label/Label';
import Time from '@components/posts/Time/Time';
import { Post } from '@services/post-service';
import { h2, subtitle } from '@styles/_typographyStyles';
import { getFirstHashtag, getHashtagLink } from '@utils/convert-utils';
import NextLink from 'next/link';
import React from 'react';

type PostItemProps = {
  data: Post;
};
function PostItem({ data }: PostItemProps) {
  const postData = data.data;
  const postUrl = `/posts/${data.uid ?? ''}`;
  const displayedHashtag = getFirstHashtag(data);

  return (
    <article>
      <div tw="relative aspect-w-16 aspect-h-9 mb-3">
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
        <NextLink href={getHashtagLink(displayedHashtag.uid)} passHref>
          <Label tw="block max-w-max mb-2">{displayedHashtag.data.title}</Label>
        </NextLink>

        <h1 tw="leading-tight! mb-1 md:(mb-2) xl:(text-3xl)">
          <NextLink href={postUrl} passHref>
            <a>{postData.title}</a>
          </NextLink>
        </h1>

        <Time
          css={subtitle}
          tw="mt-1 block text-white text-opacity-80" // important to have block, or weird gap with title
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
      tw=" bg-skin-dark pt-6 pb-1 text-white font-black md:(pt-9)"
    >
      <h1
        css={h2}
        tw="mb-5 text-center after:(content block mx-auto mt-3 w-5 h-0.5 bg-primary md:w-8 xl:w-12 ) md:(mb-6) xl:(mb-10)"
      >
        {heading}
      </h1>

      <ul tw="px-4 max-w-6xl mx-auto grid gap-y-4 md:(grid-cols-2 gap-8 px-7) xl:grid-cols-3">
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
