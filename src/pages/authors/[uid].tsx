import { Result } from '@common';
import Image from '@components/common/Image/Image';
import PagePostCards from '@components/lists/PagePostCards/PagePostCards';
import MainLayout from '@components/pages/MainLayout';
import { MemberDocument } from '@lib/prismic/component-types/member/MemberModel';
import { PrismicResult } from '@lib/prismic/prismic-service';
import { AuthorDataService } from '@services/author-data-service';
import { Post, PostService } from '@services/post-service';
import {
  createStaticError,
  createStaticProps,
  errorStatcPropsHandler,
} from '@src/server/utils/page-utils';
import { wrapper } from '@styles/spacing';
import { fonts } from '@styles/_typographyStyles';
import { getSizes } from '@utils/css-utils';
import { tryParseLocale } from '@utils/validate-utils';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import { FaLinkedinIn } from 'react-icons/fa';
/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */

type StaticProps = Result<{
  author: MemberDocument;
  postsResult: PrismicResult<Post>;
}>;

type Params = {
  uid: string;
};
export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
  locale,
  params,
}) => {
  try {
    const lang = tryParseLocale(locale);
    const authorUid = params?.uid;

    if (!authorUid) {
      return createStaticError('Author Uid is undefined');
    }

    const author = await AuthorDataService.getAuthorByUID(lang, authorUid);

    if (!author) {
      return createStaticError('Author is missing');
    }

    const postsResult = await PostService.getPostsByAuthorID(lang, author.id);

    return createStaticProps({ author, postsResult });
  } catch (error) {
    return errorStatcPropsHandler(error);
  }
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const authorDocs = await AuthorDataService.getAuthors('*');
  const paths = authorDocs.map((doc) => ({
    params: { uid: doc.uid ?? '' },
    locale: doc.lang,
  }));

  return {
    paths,
    fallback: true,
  };
};

/* -------------------------------------------------------------------------- */
/*                                   CLIENT                                   */
/* -------------------------------------------------------------------------- */

type Props = InferGetStaticPropsType<typeof getStaticProps>;

function Author({ data, error }: Props) {
  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (!data) {
    return <h1>Loading...</h1>;
  }

  const { author, postsResult } = data;

  return (
    <MainLayout title={author.data.title}>
      <section css={wrapper.page} tw="col-span-full">
        <header tw="space-y-sm flex flex-col items-center max-w-2xl mx-auto">
          <Image
            sizes={getSizes(['96px'])}
            tw="w-24 h-24 object-cover rounded-full"
            imgSrc={author.data.thumbnail.url}
            alt={author.data.thumbnail.alt}
          />

          <h1 css={fonts.h3}>{author.data.title}</h1>

          <a
            href={data.author.data.linked_in ?? ''}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn tw="transition-colors hocus:(text-primary)" />
          </a>

          <div>
            {postsResult.total_results_size}{' '}
            {postsResult.total_results_size <= 1 ? 'article' : 'articles'}
          </div>

          <div tw="text-center">
            <div tw="mt-sm">
              <RichText render={author.data.description} />
            </div>
          </div>
        </header>

        <PagePostCards posts={postsResult.results} tw="mt-2xl" />
      </section>
    </MainLayout>
  );
}

export default Author;
