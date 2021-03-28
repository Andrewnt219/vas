import EventsPage from '@layouts/EventsPage';
import MainLayout from '@layouts/MainLayout';
import { CategorySlug } from '@lib/sanity/models/CategoryModel';
import { usePostsWithMeta } from '@src/hooks/usePostsWithMeta';
import { categoryPage } from '@src/server/utils/page-utils';
import { InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';
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
	const { t } = useTranslation();

	if (serverError || error) {
		const message = serverError?.message ?? error?.message;

		return <h1>{message}</h1>;
	}

	if (!data) {
		return <h1>Fetching posts...</h1>;
	}

	return (
		<MainLayout title={t`tet:title`}>
			<EventsPage
				data={{
					bannerProps: {
						imgAlt: "A picture of sourvenirs from one of VAS's orientations",
						imgLqip: require('images/hero/tet.png?lqip'),
						imgSrc: require('images/hero/tet.png'),
						title: t`tet:title`,
						subtitle: t`tet:subtitle`,
					},
					posts: data,
				}}
			/>
		</MainLayout>
	);
}

export default Tet;
