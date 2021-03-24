import EventsPage from '@layouts/EventsPage';
import MainLayout from '@layouts/MainLayout';
import { CategorySlug } from '@lib/sanity/models/CategoryModel';
import { usePostsWithMeta } from '@src/hooks/usePostsWithMeta';
import { categoryPage } from '@src/server/utils/page-utils';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

const PAGE_CATEGORY: CategorySlug = 'tet';
/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */
export const getStaticProps = categoryPage.getStaticProps(PAGE_CATEGORY);

/* -------------------------------------------------------------------------- */
/*                                   CLIENT                                   */
/* -------------------------------------------------------------------------- */

type Props = InferGetStaticPropsType<typeof getStaticProps>;

function Tet({ data: initialData, error: serverError }: Props) {
	const { data, error } = usePostsWithMeta(PAGE_CATEGORY, initialData);

	if (serverError || error) {
		const message = serverError?.message ?? error?.message;

		return <h1>{message}</h1>;
	}

	if (!data) {
		return <h1>Fetching posts...</h1>;
	}

	return (
		<MainLayout title="Tet">
			<EventsPage data={{ bannerProps, posts: data }} />
		</MainLayout>
	);
}

const bannerProps = {
	imgAlt: "A picture of sourvenirs from one of VAS's orientations",
	imgLqip: require('images/hero/tet.png?lqip'),
	imgSrc: require('images/hero/tet.png'),
	title: 'Tet',
	subtitle:
		'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',
};

export default Tet;
