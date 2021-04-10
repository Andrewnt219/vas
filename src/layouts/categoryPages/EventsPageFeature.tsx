import Button from '@components/Button/Button';
import OrientationCard from '@components/OrientationCard/OrientationCard';
import PageBanner from '@components/PageBanner/PageBanner';
import { CategoryDocument } from '@lib/prismic/models/CategoryModel';
import { Post } from '@model';
import TripleCardsdGroup, {
	validateTripleCardsGroup,
} from '@src/layouts/TripleCardsGroup';
import React from 'react';

type Props = {
	categoryDoc: CategoryDocument;
	posts: Post[];
	className?: string;
};

function EventsPageFeature({ className, categoryDoc, posts }: Props) {
	const featuredPosts = posts.slice(0, 3);
	const otherPosts = posts.slice(2);

	return (
		<>
			<PageBanner data={categoryDoc.data} />

			{posts.length > 0 && (
				<div tw="grid-p-sm space-y-10 xl:space-y-14">
					{validateTripleCardsGroup(featuredPosts) && (
						<TripleCardsdGroup data={featuredPosts} tw="" />
					)}

					<hr tw="my-10 border-t border-black " />

					<ul
						aria-label="Articles about VAS' orientations"
						tw="  grid grid-cols-12 gap-y-8 md:gap-8 xl:gap-12"
					>
						{otherPosts.map((post) => (
							<li
								key={post.uid}
								tw="col-span-full md:col-span-6 xl:col-span-4 "
							>
								<OrientationCard data={post} />
							</li>
						))}
					</ul>

					{/* TODO: make a load more component that automatically triggered on intersect */}
					<Button variant="outline" tw="block mx-auto">
						Load More
					</Button>
				</div>
			)}
		</>
	);
}

export default EventsPageFeature;
