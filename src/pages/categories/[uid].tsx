import { Result } from '@common';
import PageBanner from '@components/PageBanner/PageBanner';
import Pagination from '@components/Pagination/Pagination';
import BlogPage from '@layouts/categoryPages/BlogPage';
import EventsPageFeature from '@layouts/categoryPages/EventsPageFeature';
import EventsPageList from '@layouts/categoryPages/EventsPageList';
import NewsPage from '@layouts/categoryPages/NewsPage';
import MainLayout from '@layouts/MainLayout';
import { CategoryDocument } from '@lib/prismic/component-types/category/CategoryModel';
import { CategoryService } from '@services/category-data-service';
import { Post, PostService } from '@services/post-service';
import { useCategoryPosts } from '@src/hooks/useCategoryPosts';
import {
  createStaticError,
  createStaticProps,
  errorStatcPropsHandler,
  errorStaticPathsHandler,
} from '@src/server/utils/page-utils';
import { tryParseLocale } from '@utils/validate-utils';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import React, { ReactNode, useState } from 'react';
import 'twin.macro';

/* --------------------------------- SERVER --------------------------------- */
type Data = {
  posts: Post[];
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

    const posts = await PostService.getPostsByCategoryUID(categoryUID, lang, {
      ref,
    });

    const data = { posts, categoryDoc, categoryUID };
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
    initialData?.posts
  );

  // server error is prioritized, so place first
  if (serverError || error) {
    return <h1>{error?.message ?? serverError?.message}</h1>;
  }

  if (!data || !categoryDoc) {
    return <h1>Fetching posts...</h1>;
  }

  let renderedCategoryPage: ReactNode;

  switch (categoryDoc.uid) {
    case 'blog':
      renderedCategoryPage = <BlogPage posts={data} />;
      break;

    case 'news':
      renderedCategoryPage = <NewsPage posts={data} />;
      break;

    case 'event':
      renderedCategoryPage = <EventsPageList posts={data} />;
      break;

    case 'orientation':
    case 'tet':
      renderedCategoryPage = <EventsPageFeature posts={data} />;
      break;

    default:
      renderedCategoryPage = <h1>This category is not available yet</h1>;
      break;
  }

  return (
    <MainLayout title={categoryDoc.data.title} tw="">
      <PageBanner data={categoryDoc.data} />

      {data.length == 0 ? (
        <h1 tw="grid-p-sm">Come back later for interesting articles</h1>
      ) : (
        renderedCategoryPage
      )}

      <Pagination
        total={data.length}
        onItemClicked={(_, page) => setPage(page)}
      />
    </MainLayout>
  );
}
export default CategoryUID;
