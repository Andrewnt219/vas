import Image from '@components/Image/Image';
import { Label } from '@components/Label/Label';
import { Post } from '@services/post-service';
import { scaleImageCss } from '@styles/apply';
import { articleTitle } from '@styles/_typographyStyles';
import { getHashtagLink, getPostLink } from '@utils/convert-utils';
import { getSizes } from '@utils/css-utils';
import NextLink from 'next/link';
import { RichText } from 'prismic-reactjs';
import React from 'react';

type Props = {
  className?: string;
  post: Post;
};

// TODO Add meta data: author + published date
// TODO Adjust spacing to match cards in Homepage
function NewsCard({ className, post }: Props) {
  const postLink = getPostLink(post.uid ?? post.id);
  const hashtag = post.data.hashtags?.[0]?.hashtag;

  return (
    <article className={className} tw="">
      <hr tw="border-black border-opacity-50" />

      <div tw="mt-6 grid md:(mt-12)  xl:(grid-cols-5 gap-x-8)">
        <div tw="relative aspect-w-16 aspect-h-9 border border-black border-opacity-50 xl:(col-span-2 aspect-w-4 aspect-h-3)">
          <NextLink href={postLink}>
            <a>
              <Image
                sizes={getSizes(['100vw', undefined, '1200px'])}
                tw="img-absolute absolute!"
                css={scaleImageCss}
                imgSrc={post.data.thumbnail.url}
                alt={post.data.thumbnail.alt ?? 'Missing alternative text'}
              />
            </a>
          </NextLink>
        </div>

        <div tw="max-w-prose mt-3 xl:(mt-0 col-span-3 flex flex-col justify-between)">
          <header>
            <NextLink href={getHashtagLink(hashtag.uid)} passHref>
              <Label>{hashtag.data.title ?? '--'}</Label>
            </NextLink>

            <h2
              css={articleTitle}
              tw="mt-2 hocus:(underline text-primary) xl:(mt-5)"
            >
              <NextLink href={postLink}>
                <a>{post.data.title}</a>
              </NextLink>
            </h2>
            <div tw="mt-4 text-skin-muted md:text-2xl xl:mt-8">
              <RichText render={post.data.snippet} />
            </div>
          </header>

          <p tw="mt-8 text-right text-skin-muted md:text-xl xl:(mt-0 text-left)">
            {post.meta?.views ?? 0} views &#47; {post.comments.length ?? 0}{' '}
            comments
          </p>
        </div>
      </div>
    </article>
  );
}

export default NewsCard;
