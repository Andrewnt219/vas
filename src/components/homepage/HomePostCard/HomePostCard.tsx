import Image from '@components/Image/Image';
import { Post } from '@services/post-service';
import {
  getAuthorLink,
  getFirstHashtag,
  getHashtagLink,
} from '@utils/convert-utils';
import NextLink from 'next/link';
import React from 'react';

type Props = { className?: string; post: Post };

function HomePostCard({ className, post }: Props) {
  const hashtag = getFirstHashtag(post);

  return (
    <article className={className} tw="">
      <Image imgSrc={post.data.thumbnail.url} alt={post.data.thumbnail.alt} />

      <header>
        <NextLink href={getHashtagLink(hashtag.uid)}>
          <a>{hashtag.data.title}</a>
        </NextLink>

        <h2>{post.data.title}</h2>

        <span>
          By
          <NextLink href={getAuthorLink(post.data.author.uid)} passHref>
            <a>{post.data.author.data.title}</a>
          </NextLink>
        </span>
      </header>

      <p>{post.data.snippet}</p>
    </article>
  );
}

export default HomePostCard;
