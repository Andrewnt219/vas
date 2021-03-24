import { Response } from '@api-response';
import NewsCard from '@components/NewsCard/NewsCard';
import PageBanner from '@components/PageBanner/PageBanner';
import Pagination from '@components/Pagination/Pagination';
import { DEFAULT_LANGUAGE } from '@data/localization-data';
import { NewsCardModel } from '@lib/sanity/models/NewsCardModel';
import { PostDataService } from '@services/post-data-service';
import MainLayout from '@src/layouts/MainLayout';
import { errorStatcPropsHandler } from '@src/server/utils/page-utils';
import { isValidLocale } from '@utils/validate-utils';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import React, { VFC } from 'react';

// TODO add an api to fetch posts and swr instead of ssr
/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */
type StaticProps = Response<NewsCardModel[]>;

export const getStaticProps: GetStaticProps<StaticProps> = async ({
	locale,
}) => {
	try {
		const lang = isValidLocale(locale) ? locale : DEFAULT_LANGUAGE;
		const posts = await PostDataService.getPostsWithMetaByCategory(
			'news',
			lang
		);

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

const news: VFC<Props> = ({ data, error }) => {
	if (error) {
		return <h1>{error.message}</h1>;
	}

	if (!data) {
		return <h1>Fetching posts...</h1>;
	}

	return (
		<MainLayout title="News" tw="">
			<PageBanner
				data={{
					imgSrc: require('images/hero/news.jpg'),
					imgLqip: require('images/hero/news.jpg?lqip'),
					imgAlt: 'A table with various souvenirs from Seneca College',
					subtitle:
						'Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.',
					title: 'News',
				}}
			/>

			{data.length > 0 && (
				<>
					<ul
						tw="grid-p-sm flex flex-col space-y-6 md:(space-y-12)"
						aria-label="articles about VAS' news"
					>
						{data.map((post) => (
							<li key={post.slug}>
								<NewsCard data={post} />
							</li>
						))}
					</ul>

					<Pagination
						tw="col-span-full"
						total={data.length}
						onItemClicked={(ev, page) => console.log(page)}
					/>
				</>
			)}
		</MainLayout>
	);
};

export default news;
