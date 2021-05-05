import Button from '@components/Button/Button';
import Image from '@components/Image/Image';
import PublishedDate from '@components/PublishedDate/PublishedDate';
import { Format } from '@data/common-data';
import { Post } from '@services/post-service';
import { getPostLink } from '@utils/convert-utils';
import { getSizes } from '@utils/css-utils';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import { RichText } from 'prismic-reactjs';
import React from 'react';

type Props = { className?: string; data: Post };

// TODO adjusted spacing to match homepage's card
// TODO adjusted meta tag to match homepage's card
function EventCard({ className, data: postDoc }: Props) {
  const publishedAt = new Date(postDoc.first_publication_date ?? '');
  const fromDate = dayjs(postDoc.data.from_date ?? Date.now());
  const toDate = dayjs(postDoc.data.from_date ?? Date.now());
  const postLink = getPostLink(postDoc.uid ?? '');
  const imgSrc = postDoc.data.thumbnail.url;

  return (
    <article className={className} tw="space-y-4 xl:space-y-14">
      <PublishedDate date={new Date(publishedAt)} />

      <h2 tw=" font-black article-card-title-variants">
        <NextLink href={postLink}>
          <a>{postDoc.data.title}</a>
        </NextLink>
      </h2>

      <div tw="grid md:grid-cols-2  text-body font-medium md:text-lg">
        <div tw="relative col-span-full pb-xs mb-4 md:(mb-6 pb-2xs)">
          <NextLink href={postLink}>
            <a>
              <Image
                sizes={getSizes(['90vw', undefined, '2000px'])}
                tw="img-absolute absolute!"
                imgSrc={imgSrc}
                alt={postDoc.data.thumbnail.alt ?? 'Missing alternative text'}
              />
            </a>
          </NextLink>
        </div>

        <p>
          Time:{' '}
          <time dateTime={fromDate.format(Format.SHORT_TEXT_DATE)}>
            {fromDate.format(Format.SHORT_TEXT_DATE)}
          </time>{' '}
          {postDoc.data.to_date && (
            <>
              &#8211;{' '}
              <time dateTime={toDate.format(Format.SHORT_TEXT_DATE)}>
                {toDate.format(Format.SHORT_TEXT_DATE)}
              </time>
            </>
          )}
        </p>

        <p tw="md:text-right">Location: {postDoc.data.location}</p>
      </div>

      <div tw="text-base text-skin-muted md:text-newsBody">
        <div tw="mb-4 md:mb-6">
          <RichText render={postDoc.data.snippet} />
        </div>

        <NextLink href={postLink} passHref>
          <Button as="a" variant="link">
            Read more ...
          </Button>
        </NextLink>
      </div>
    </article>
  );
}

export default EventCard;
