import { Result } from '@common';
import PageBanner from '@components/common/PageBanner/PageBanner';
import Pagination from '@components/common/Pagination/Pagination';
import PagePostCards from '@components/lists/PagePostCards/PagePostCards';
import MainLayout from '@components/pages/MainLayout';
import { CategoryDocument } from '@lib/prismic/component-types/category/CategoryModel';
import { PrismicResult } from '@lib/prismic/prismic-service';
import { useCategoryPosts } from '@src/hooks/useCategoryPosts';
import { CategoryService } from '@src/server/services/category-data-service';
import { Post, PostService } from '@src/server/services/post-service';
import {
  createStaticError,
  createStaticProps,
  errorStatcPropsHandler,
  errorStaticPathsHandler,
} from '@src/server/utils/page-utils';
import { tryParseLocale } from '@utils/validate-utils';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import React, { useState } from 'react';

/* --------------------------------- SERVER --------------------------------- */
type Data = {
  postsResult: PrismicResult<Post>;
  categoryUID: string;
  categoryDoc: CategoryDocument;
};
type StaticProps = Result<Data>;
type Params = {
  uid: string;
};
export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
  locale,
  params,
  previewData = {},
}) => {
  try {
    //NOTE As of 10.2, the typing has changed so an explicit cast is needed
    const { ref = '' } = previewData as { ref: string | undefined };

    const categoryUID = params?.uid;
    const lang = tryParseLocale(locale);

    if (!categoryUID) {
      return createStaticError("Missing category's UID");
    }

    const categoryDoc = await CategoryService.getCategoryByUID(
      categoryUID,
      lang,
      {
        ref,
      }
    );

    if (!categoryDoc) {
      return createStaticError('Category not found');
    }

    const postsResult = await PostService.getPostsByCategoryUID(
      categoryUID,
      lang,
      {
        ref,
      }
    );

    if (!postsResult) {
      return createStaticError('Cannot find matching posts');
    }

    const data = { postsResult, categoryDoc, categoryUID };
    return createStaticProps(data);
  } catch (error) {
    return errorStatcPropsHandler(error);
  }
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  try {
    const categoryDoc = await CategoryService.getCategories('*');

    const paths = categoryDoc.map((doc) => ({
      params: { uid: doc.uid ?? '' },
      locale: doc.lang,
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    return errorStaticPathsHandler(error);
  }
};

/* --------------------------------- CLIENT --------------------------------- */

type Props = InferGetStaticPropsType<typeof getStaticProps>;

function CategoryUID({ data: initialData, error: serverError }: Props) {
  const [page, setPage] = useState(1);

  const categoryDoc = initialData?.categoryDoc;
  const { data, error } = useCategoryPosts(
    categoryDoc?.uid,
    page,
    initialData?.postsResult
  );

  // server error is prioritized, so place first
  if (serverError || error) {
    return <h1>{error?.message ?? serverError?.message}</h1>;
  }

  if (!data || !categoryDoc) {
    return <h1>Fetching posts...</h1>;
  }

  return (
    <MainLayout title={categoryDoc.data.title} tw="">
      <PageBanner data={categoryDoc.data} />

      {data.results.length == 0 ? (
        <h1 tw="grid-p-sm">Come back later for interesting articles</h1>
      ) : (
        <section
          id="body-content"
          tw="grid-p-sm"
          style={{ scrollMarginTop: '8rem' }}
        >
          <PagePostCards posts={data.results} />
        </section>
      )}

      <Pagination
        tw="col-span-full"
        total={data.total_results_size}
        perPage={data.results_per_page}
        onItemClicked={(_, page) => {
          setPage(page);
          document.getElementById('body-content')?.scrollIntoView();
        }}
      />
    </MainLayout>
  );
}
export default CategoryUID;
