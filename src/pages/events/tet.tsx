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
		const posts = await PostDataService.getPostsByCategory('tet', lang);

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

function Tet({ data, error }: Props) {
	if (error) {
		return <h1>{error.message}</h1>;
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
