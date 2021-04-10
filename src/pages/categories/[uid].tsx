import { Result } from '@api-response';
import BlogPage from '@layouts/categoryPages/BlogPage';
import NewsPage from '@layouts/categoryPages/NewsPage';
import { CategoryDocument } from '@lib/prismic/models/CategoryModel';
import { Post } from '@model';
import { CategoryService } from '@services/category-data-service';
import { PostService } from '@services/post-service';
import {
	errorStatcPropsHandler,
	errorStaticPathsHandler,
} from '@src/server/utils/page-utils';
import { tryParseLocale } from '@utils/validate-utils';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';
import 'twin.macro';

/* --------------------------------- SERVER --------------------------------- */
type StaticProps = Result<
	Post[],
	{ categoryUID: string; categoryDoc: CategoryDocument }
>;
type Params = {
	uid: string;
};
export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
	locale,
	params,
}) => {
	try {
		const categoryUID = params?.uid;
		const lang = tryParseLocale(locale);

		if (!categoryUID) {
			return {
				props: {
					data: null,
					error: { message: "Missing category's UID" },
				},
				revalidate: 60,
			};
		}

		const categoryDoc = await CategoryService.getCategoryByUID(
			categoryUID,
			lang
		);

		if (!categoryDoc) {
			return {
				props: {
					data: null,
					error: { message: 'Category not found' },
				},
			};
		}

		const posts = await PostService.getPostsByCategoryUID(categoryUID, lang);

		return {
			props: {
				data: posts,
				error: null,
				meta: { categoryDoc, categoryUID },
			},
			revalidate: 60,
		};
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

function CategoryUID({ data, error, meta }: Props) {
	if (error) {
		return <h1>{error.message}</h1>;
	}

	if (!data || !meta) {
		return <h1>Fetching posts...</h1>;
	}

	// TODO make these page in Prismic
	switch (meta.categoryUID) {
		case 'blog':
			return <BlogPage categoryDoc={meta.categoryDoc} posts={data} />;

		case 'news':
			return <NewsPage categoryDoc={meta.categoryDoc} posts={data} />;

		case 'events':
			return;

		case 'orientation':
			return;

		case 'tet':
			return;

		default:
			break;
	}
}
export default CategoryUID;
