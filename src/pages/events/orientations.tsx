import EventsPage from '@layouts/EventsPage';
import MainLayout from '@layouts/MainLayout';
import { CategorySlug } from '@lib/sanity/models/CategoryModel';
import { usePostsWithMeta } from '@src/hooks/usePostsWithMeta';
import { categoryPage } from '@src/server/utils/page-utils';
import { InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';
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
	const { t } = useTranslation();

	if (serverError || error) {
		const message = serverError?.message ?? error?.message;

		return <h1>{message}</h1>;
	}
	if (!data) {
		return <h1>Fetching posts...</h1>;
	}

	return (
		<MainLayout title={t('orientation:title')}>
			<EventsPage
				data={{
					posts: data,
					bannerProps: {
						imgAlt: "A picture of sourvenirs from one of VAS's orientations",
						imgLqip: require('images/hero/orientation.jpg?lqip'),
						imgSrc: require('images/hero/orientation.jpg'),
						title: t('orientation:title'),
						subtitle: t('orientation:subtitle'),
					},
				}}
			/>
		</MainLayout>
	);
}

export default Orientations;
