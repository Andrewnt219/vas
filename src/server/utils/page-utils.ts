import { ErrorResponse, Response } from '@api-response';
import { PostWihMeta } from '@common';
import { DEFAULT_LANGUAGE } from '@data/localization-data';
import { CategorySlug } from '@lib/sanity/models/CategoryModel';
import { PostModel } from '@lib/sanity/models/PostModel';
import { PostDataService } from '@services/post-data-service';
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next';
import { isValidCategorySlug, isValidLocale } from '../../utils/validate-utils';

export function errorStatcPropsHandler(
	error: unknown
): GetStaticPropsResult<ErrorResponse> {
	console.log(error);

	return {
		props: {
			data: null,
			error: { message: 'Something went wrong' },
		},
		revalidate: 60,
	};
}

type PostPage = {
	getStaticProps: GetStaticProps<
		Response<{
			post: PostWihMeta;
			relatedPosts: PostModel[];
		}>,
		{ slug: string }
	>;
	getStaticPathsByCategorySlug: (
		categorySlug: CategorySlug
	) => GetStaticPaths<{ slug: string }>;
};

export const postPage: PostPage = {
	getStaticProps: async ({ params, locale }) => {
		try {
			if (!params?.slug) {
				return {
					props: {
						data: null,
						error: { message: 'Missing slug' },
					},
				};
			}

			const post = await PostDataService.getPostBySlug(params.slug);
			if (!post) {
				return {
					props: {
						data: null,
						error: { message: 'Post not found' },
					},
				};
			}

			const categorySlug = post.categories[0]?.slug;
			if (!isValidCategorySlug(categorySlug)) {
				return {
					props: {
						data: null,
						error: { message: 'Unknown category' },
					},
				};
			}

			const fsPost = await PostDataService.getFsPost(post.slug);
			const relatedPosts = await PostDataService.getRelatedPost(
				post.slug,
				isValidLocale(locale) ? locale : DEFAULT_LANGUAGE
			);

			return {
				props: {
					data: {
						post: { ...post, ...fsPost },
						relatedPosts,
					},
					error: null,
				},
				revalidate: 60,
			};
		} catch (error) {
			return errorStatcPropsHandler(error);
		}
	},

	getStaticPathsByCategorySlug: (categorySlug) => async ({ defaultLocale }) => {
		if (!isValidLocale(defaultLocale)) {
			return {
				paths: [],
				fallback: true,
			};
		}

		const slugs = await PostDataService.getPostSlugsByCategory(
			categorySlug,
			defaultLocale
		);

		const paths = slugs.map(({ slug }) => ({ params: { slug } }));

		return {
			paths,
			fallback: true,
		};
	},
};

type CategoryPage = {
	getStaticProps: (
		categorySlug: CategorySlug
	) => GetStaticProps<Response<PostWihMeta[]>>;
};
export const categoryPage: CategoryPage = {
	getStaticProps: (categorySlug) => async ({ locale }) => {
		try {
			const lang = isValidLocale(locale) ? locale : DEFAULT_LANGUAGE;
			const posts = await PostDataService.getPostsWithMetaByCategory(
				categorySlug,
				lang
			);

			return {
				props: { data: posts, error: null },
				revalidate: 60,
			};
		} catch (error) {
			return errorStatcPropsHandler(error);
		}
	},
};
