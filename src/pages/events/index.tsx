import EventCard from '@components/EventCard/EventCard';
import PageBanner from '@components/PageBanner/PageBanner';
import Pagination from '@components/Pagination/Pagination';
import { CategorySlug } from '@lib/sanity/models/CategoryModel';
import { usePostsWithMeta as usePostsWithMeta } from '@src/hooks/usePostsWithMeta';
import MainLayout from '@src/layouts/MainLayout';
import { categoryPage } from '@src/server/utils/page-utils';
import { InferGetStaticPropsType } from 'next';
import React, { VFC } from 'react';

const PAGE_CATEGORY: CategorySlug = 'events';
/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */
export const getStaticProps = categoryPage.getStaticProps(PAGE_CATEGORY);
/* -------------------------------------------------------------------------- */
/*                                   CLIENT                                   */
/* -------------------------------------------------------------------------- */

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Events: VFC<Props> = ({ data: initialData, error: serverError }) => {
	const { data, error } = usePostsWithMeta(PAGE_CATEGORY, initialData);

	if (serverError || error) {
		const message = serverError?.message ?? error?.message;

		return <h1>{message}</h1>;
	}

	if (!data) {
		return <h1>Fetching posts...</h1>;
	}

	return (
		<MainLayout title="Events" tw="">
			<PageBanner
				data={{
					imgSrc: require('images/hero/events.jpg'),
					imgLqip: require('images/hero/events.jpg?lqip'),
					imgAlt: 'a group of students attending an event at Senece College',
					subtitle:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					title: 'Events',
				}}
			/>

			<ul
				tw="grid-p-sm flex flex-col space-y-16 xl:(col-start-3 col-end-12 all-child:(w-sm even:self-end))"
				aria-label="articles about VAS' events"
			>
				{data.length > 0 &&
					data.map((post) => (
						<li key={post._id}>
							<EventCard data={post} />
						</li>
					))}
			</ul>

			{data.length > 0 && (
				<Pagination
					tw="col-span-full"
					total={data.length}
					onItemClicked={(ev, page) => console.log(page)}
				/>
			)}
		</MainLayout>
	);
};

export default Events;
