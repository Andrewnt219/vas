import { Response } from '@api-response';
import NewsCard from '@components/NewsCard/NewsCard';
import PageBanner from '@components/PageBanner/PageBanner';
import Pagination from '@components/Pagination/Pagination';
import { NewsCardModel } from '@lib/sanity/models/NewsCardModel';
import { LocaleDataService } from '@services/locale-data-service';
import { PostDataService } from '@services/post-data-service';
import MainLayout from '@src/layouts/MainLayout';
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
	LocaleDataService.setLocale(locale);

	const posts = await PostDataService.getPostsByCategory('news');

	const newsPost: NewsCardModel[] = await Promise.all(
		posts.map(async (post) => {
			const meta = await PostDataService.getFsPost(post.slug);
			return { ...post, ...meta };
		})
	);

	return {
		props: { data: newsPost, error: null },
		revalidate: 60,
	};
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
