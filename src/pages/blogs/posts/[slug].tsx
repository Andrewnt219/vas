import PostWithoutHero from '@layouts/PostWithoutHero';
import { usePost } from '@src/hooks/usePost';
import { postPage } from '@src/server/utils/page-utils';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */

export const getStaticProps = postPage.getStaticProps;

export const getStaticPaths = postPage.getStaticPathsByCategorySlug('blog');

/* -------------------------------------------------------------------------- */
/*                                   CLIENT                                   */
/* -------------------------------------------------------------------------- */
type Props = InferGetStaticPropsType<typeof getStaticProps>;

const NewsPost = ({ data: serverData, error: serverError }: Props) => {
	const { data, error } = usePost(serverData?.post.slug, serverData);
	return <PostWithoutHero data={data} error={error} />;
};

export default NewsPost;
