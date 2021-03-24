import EventsPage from '@layouts/EventsPage';
import MainLayout from '@layouts/MainLayout';
import { CategorySlug } from '@lib/sanity/models/CategoryModel';
import { usePostsWithMeta } from '@src/hooks/usePostsWithMeta';
import { categoryPage } from '@src/server/utils/page-utils';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

const PAGE_CATEGORY: CategorySlug = 'orientation';
/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */

export const getStaticProps = categoryPage.getStaticProps(PAGE_CATEGORY);

/* -------------------------------------------------------------------------- */
/*                                   CLIENT                                   */
/* -------------------------------------------------------------------------- */

type Props = InferGetStaticPropsType<typeof getStaticProps>;

function Orientations({ data: intiialData, error: serverError }: Props) {
	const { data, error } = usePostsWithMeta(PAGE_CATEGORY, intiialData);

	if (serverError || error) {
		const message = serverError?.message ?? error?.message;

		return <h1>{message}</h1>;
	}
	if (!data) {
		return <h1>Fetching posts...</h1>;
	}

	return (
		<MainLayout title="Orientations">
			<EventsPage data={{ posts: data, bannerProps }} />
		</MainLayout>
	);
}

const bannerProps = {
	imgAlt: "A picture of sourvenirs from one of VAS's orientations",
	imgLqip: require('images/hero/orientation.jpg?lqip'),
	imgSrc: require('images/hero/orientation.jpg'),
	title: 'Orientation',
	subtitle:
		'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
};

export default Orientations;
