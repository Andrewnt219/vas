import EventCard from '@components/EventCard/EventCard';
import PageBanner from '@components/PageBanner/PageBanner';
import Pagination from '@components/Pagination/Pagination';
import { CategoryDocument } from '@lib/prismic/models/CategoryModel';
import { Post } from '@model';
import React from 'react';
import 'twin.macro';
import MainLayout from '../MainLayout';

type Props = {
	className?: string;
	categoryDoc: CategoryDocument;
	posts: Post[];
};

function EventsPageList({ className, posts, categoryDoc }: Props) {
	return (
		<MainLayout title={categoryDoc.data.title} tw="" className={className}>
			<PageBanner data={categoryDoc.data} />

			<ul
				tw="grid-p-sm flex flex-col space-y-16 xl:(col-start-3 col-end-12 all-child:(w-sm even:self-end))"
				aria-label="articles about VAS' events"
			>
				{posts.length > 0 &&
					posts.map((post) => (
						<li key={post.id}>
							<EventCard data={post} />
						</li>
					))}
			</ul>

			{posts.length > 0 && (
				<Pagination
					tw="col-span-full"
					total={posts.length}
					onItemClicked={(ev, page) => console.log(page)}
				/>
			)}
		</MainLayout>
	);
}

export default EventsPageList;
