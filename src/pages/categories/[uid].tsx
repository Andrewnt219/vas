import { Result } from '@api-response';
import { PreviewProvider } from '@contexts/PreviewContext';
import BlogPage from '@layouts/categoryPages/BlogPage';
import NewsPage from '@layouts/categoryPages/NewsPage';
import { CategoryDocument } from '@lib/prismic/models/CategoryModel';
import { Post } from '@model';
import { CategoryService } from '@services/category-data-service';
import { PostService } from '@services/post-service';
import { useCategoryPosts } from '@src/hooks/useCategoryPosts';
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
> & { preview: boolean };
type Params = {
	uid: string;
};
export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
	locale,
	params,
	previewData = {},
	preview = false,
}) => {
	try {
		const { ref } = previewData;

		const categoryUID = params?.uid;
		const lang = tryParseLocale(locale);

		if (!categoryUID) {
			return {
				props: {
					data: null,
					error: { message: "Missing category's UID" },
					preview,
				},
				revalidate: 60,
			};
		}

		const categoryDoc = await CategoryService.getCategoryByUID(
			categoryUID,
			lang,
			ref
		);

		if (!categoryDoc) {
			return {
				props: {
					data: null,
					error: { message: 'Category not found' },
					preview,
				},
			};
		}

		const posts = await PostService.getPostsByCategoryUID(categoryUID, lang);

		return {
			props: {
				data: posts,
				error: null,
				meta: { categoryDoc, categoryUID },
				preview,
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

function CategoryUID({
	data: initialData,
	error: serverError,
	meta,
	preview,
}: Props) {
	const { data, error } = useCategoryPosts(meta?.categoryUID, initialData);

	if (error || serverError) {
		return <h1>{error?.message ?? serverError?.message}</h1>;
	}

	if (!data || !meta) {
		return <h1>Fetching posts...</h1>;
	}

	let renderedCategoryPage = <h1>This category is not available</h1>;

	switch (meta.categoryUID) {
		case 'blog':
			renderedCategoryPage = (
				<BlogPage categoryDoc={meta.categoryDoc} posts={data} />
			);
			break;

		case 'news':
			renderedCategoryPage = (
				<NewsPage categoryDoc={meta.categoryDoc} posts={data} />
			);
			break;

		case 'events':
		case 'orientation':
		case 'tet':
		default:
			break;
	}

	return (
		<PreviewProvider initialValue={preview}>
			{renderedCategoryPage}
		</PreviewProvider>
	);
}
export default CategoryUID;
