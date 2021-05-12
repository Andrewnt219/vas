import Image from '@components/common/Image/Image';
import { MemberModel } from '@lib/prismic/component-types/member/MemberModel';
import { tag } from '@styles/_typographyStyles';
import { getAuthorLink } from '@utils/convert-utils';
import NextLink from 'next/link';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import { FaLinkedinIn } from 'react-icons/fa';
import 'twin.macro';

type Props = { className?: string; data: MemberModel };

function AuthordCard({ className, data }: Props) {
  const imgSrc = `${data.thumbnail.url}&w=96&h=96&fit=crop`;
  const placeholder = `${data.title} is the author of this article. Feel free to leave comments and feedbacks below`;

  return (
    <article
      className={className}
      tw="flex flex-col items-center bg-skin-light px-5 pt-12 pb-10 md:(pt-12 px-11 pb-11) xl:(flex-row items-start)"
    >
      <div tw="xl:(-ml-24 mr-8)">
        <Image
          sizes="96px"
          imgSrc={imgSrc}
          alt={data.thumbnail.alt ?? 'An avatar of the author'}
          height={96}
          width={96}
          tw="w-24 h-24 rounded-full object-cover"
        />
      </div>

      {/* NOTE interesting, without flex-1, the image is squished */}
      <div tw="space-y-5 flex-1 mt-2 text-center xl:text-left flex flex-col items-center xl:(items-start mt-0)">
        <header tw="leading-snug">
          <p css={tag}>Written By</p>
          {/* TODO link to author page */}
          <NextLink href={getAuthorLink(data.uid)} passHref>
            <a tw="font-black transition-colors hocus:text-primary md:text-3xl">
              {data.title}
            </a>
          </NextLink>
        </header>

        <div>
          {data.description ? (
            <RichText render={data.description} />
          ) : (
            <p>{placeholder}</p>
          )}
        </div>

        <footer>
          <ul>
            <li>
              <a
                href={data.linked_in ?? ''}
                target="_blank"
                rel="noopner noreferrer"
                tw="hover:text-primary svg:transition-colors"
              >
                <FaLinkedinIn />
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </article>
  );
}

export default AuthordCard;
