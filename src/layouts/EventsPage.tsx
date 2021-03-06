import Button from '@components/Button/Button';
import OrientationCard from '@components/OrientationCard/OrientationCard';
import PageBanner from '@components/PageBanner/PageBanner';
import { OrientationCardModel } from '@lib/sanity/models/OrientationCardModel';
import MainLayout from '@src/layouts/MainLayout';
import TripleCardsdGroup, {
	validateTripleCardsGroup,
} from '@src/layouts/TripleCardsGroup';
import { ComponentProps } from '@utils';
import React from 'react';
import 'twin.macro';

type Props = {
	className?: string;
	data: {
		posts: OrientationCardModel[];
		bannerProps: ComponentProps<typeof PageBanner>['data'];
	};
};

function EventsPage({ className, data }: Props) {
	const { posts, bannerProps } = data;

	const featuredPosts = posts.slice(0, 3);
	const otherPosts = posts.slice(2);

	return (
		<MainLayout title="Orientations" className={className}>
			<PageBanner data={bannerProps} />

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
						<li key={post.slug} tw="col-span-full md:col-span-6 xl:col-span-4 ">
							<OrientationCard data={post} />
						</li>
					))}
				</ul>

				{/* TODO: make a load more component that automatically triggered on intersect */}
				<Button variant="outline">Load More</Button>
			</div>
		</MainLayout>
	);
}

export default EventsPage;
