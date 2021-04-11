import { CategoryUIDPage } from '@common';
import EventCard from '@components/EventCard/EventCard';
import Pagination from '@components/Pagination/Pagination';
import React from 'react';
import 'twin.macro';

type Props = CategoryUIDPage;

function EventsPageList({ className, posts }: Props) {
	return (
		<section className={className} tw="grid-p-sm xl:(col-start-3 col-end-12 )">
			<ul
				tw=" flex flex-col space-y-16 xl:(all-child:(w-sm even:self-end))"
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
					total={posts.length}
					onItemClicked={(ev, page) => console.log(page)}
				/>
			)}
		</section>
	);
}

export default EventsPageList;
