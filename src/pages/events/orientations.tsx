import { Response } from '@api-response';
import { DEFAULT_LANGUAGE } from '@data/localization-data';
import EventsPage from '@layouts/EventsPage';
import MainLayout from '@layouts/MainLayout';
import { PostModel } from '@lib/sanity/models/PostModel';
import { PostDataService } from '@services/post-data-service';
import { errorStatcPropsHandler } from '@src/server/utils/page-utils';
import { isValidLocale } from '@utils/validate-utils';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';
/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */
type StaticProps = Response<PostModel[]>;

export const getStaticProps: GetStaticProps<StaticProps> = async ({
	locale,
}) => {
	try {
		const lang = isValidLocale(locale) ? locale : DEFAULT_LANGUAGE;
		const posts = await PostDataService.getPostsByCategory('orientation', lang);

		return {
			props: { data: posts, error: null },
			revalidate: 60,
		};
	} catch (error) {
		return errorStatcPropsHandler(error);
	}
};

/* -------------------------------------------------------------------------- */
/*                                   CLIENT                                   */
/* -------------------------------------------------------------------------- */

type Props = InferGetStaticPropsType<typeof getStaticProps>;

function Orientations({ data, error }: Props) {
	if (error) {
		return <h1>{error.message}</h1>;
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
