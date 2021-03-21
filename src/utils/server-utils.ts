import { Response } from '@api-response';
import { CategorySlug } from '@lib/sanity/models/CategoryModel';
import { PostModel } from '@lib/sanity/models/PostModel';
import { PostDataService } from '@services/post-data-service';
import { GetStaticPaths, GetStaticProps } from 'next';
import { assertLanguages } from './validate-utils';

type StaticPostProps = Response<PostModel>;
type StaticPostParams = {
	slug: string;
};
export const getStaticPost: GetStaticProps<
	StaticPostProps,
	StaticPostParams
> = async ({ params, locale }) => {
	assertLanguages(locale);

	PostDataService.switchLanguage(locale);

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

	return {
		props: {
			data: post,
			error: null,
		},
		revalidate: 60,
	};
};

export const getStaticPostsPathsByCategory: (
	categorySlug: CategorySlug
) => GetStaticPaths<StaticPostParams> = (categorySlug) => async () => {
	const slugs = await PostDataService.getPostSlugsByCategory(categorySlug);

	const paths = slugs.map(({ slug }) => ({ params: { slug } }));

	return {
		paths,
		fallback: true,
	};
};
