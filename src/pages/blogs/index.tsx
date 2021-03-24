import NewsCard from '@components/NewsCard/NewsCard';
import PageBanner from '@components/PageBanner/PageBanner';
import Pagination from '@components/Pagination/Pagination';
import { CategorySlug } from '@lib/sanity/models/CategoryModel';
import { usePostsWithMeta } from '@src/hooks/usePostsWithMeta';
import MainLayout from '@src/layouts/MainLayout';
import { categoryPage } from '@src/server/utils/page-utils';
import { InferGetStaticPropsType } from 'next';
import React, { VFC } from 'react';

const PAGE_CATEGORY: CategorySlug = 'blog';
/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */
export const getStaticProps = categoryPage.getStaticProps(PAGE_CATEGORY);

/* -------------------------------------------------------------------------- */
/*                                   CLIENT                                   */
/* -------------------------------------------------------------------------- */

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const BlogIndex: VFC<Props> = ({ data: initialData, error: serverError }) => {
	const { data, error } = usePostsWithMeta(PAGE_CATEGORY, initialData);

	if (serverError || error) {
		const message = serverError?.message ?? error?.message;

		return <h1>{message}</h1>;
	}

	if (!data) {
		return <h1>Fetching posts...</h1>;
	}

	return (
		<MainLayout title="Blogs" tw="">
			<PageBanner
				data={{
					imgSrc: require('images/hero/news.jpg'),
					imgLqip: require('images/hero/news.jpg?lqip'),
					imgAlt: 'A table with various souvenirs from Seneca College',
					subtitle:
						'Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.',
					title: 'Blogs',
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

export default BlogIndex;
