import Button from '@components/Button/Button';
import MainLayout from '@components/MainLayout/MainLayout';
import OrientationCard from '@components/OrientationCard/OrientationCard';
import PageBanner from '@components/PageBanner/PageBanner';
import TripleCardsdGroup from '@components/TripleCardGroup/TripleCardsGroup';
import { OrientationCardModel } from '@lib/sanity/models/OrientationCardModel';
import React from 'react';
import 'twin.macro';

type Props = { className?: string };

function orientations({ className }: Props) {
	const posts = [];
	if (posts.length > 3) {
		posts.push('a');
	}
	return (
		<MainLayout title="Orientations">
			<PageBanner
				data={{
					imgAlt: "A picture of sourvenirs from one of VAS's orientations",
					imgLqip: require('images/hero/orientation.png?lqip'),
					imgSrc: require('images/hero/orientation.png'),
					title: 'Orientation',
					subtitle:
						'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
				}}
			/>

			<div tw="grid-p-sm space-y-10 xl:space-y-14">
				<TripleCardsdGroup data={[card, card1, card2]} tw="" />

				<hr tw="my-10 border-t border-black " />

				<ul
					aria-label="Articles about VAS' orientations"
					tw="  grid grid-cols-12 gap-y-8 md:gap-8 xl:gap-12"
				>
					{[card3, card4, card5].map((post) => (
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

const card: OrientationCardModel = {
	fromDate: new Date().toISOString(),
	toDate: new Date().toISOString(),
	locations: ['Newnham', 'York'],
	slug:
		'en-us-takashi-murakami-curates-new-healing-group-exhibition-at-perrotin-shanghai',
	snippet: 'Showcasing diverse works by Kaikai Kiki artists.',
	thumbnail: {
		url: require('images/hero/about-us.png'),
		metadata: {
			height: 100,
			lqip: require('images/hero/about-us.png?lqip'),
			ratio: 0.5,
			width: 100,
		},
		alt: 'dasdasdas',
	},
	title: 'The most recent orientation',
};

const card1: OrientationCardModel = {
	fromDate: new Date().toISOString(),
	toDate: new Date().toISOString(),
	locations: ['Newnham'],
	slug:
		'en-us-takashi-murakami-curates-new-healing-group-exhibition-at-perrotin-shanghai',
	snippet:
		'The band’s BlizzCon concert was interrupted with royalty-free music to avoid a copyright violation and takedown order.',
	thumbnail: {
		url: require('images/hero/events.png'),
		metadata: {
			height: 100,
			lqip: require('images/hero/events.png?lqip'),
			ratio: 0.5,
			width: 100,
		},
		alt: 'dasdasdas',
	},
	title: 'Summer 2020 Orientation',
};

const card2: OrientationCardModel = {
	fromDate: new Date().toISOString(),
	toDate: new Date().toISOString(),
	locations: ['Newnham'],
	slug:
		'en-us-takashi-murakami-curates-new-healing-group-exhibition-at-perrotin-shanghai',
	snippet: 'Summer 2020 Orientation',
	thumbnail: {
		url: require('images/hero/news.png'),
		metadata: {
			height: 100,
			lqip: require('images/hero/news.png?lqip'),
			ratio: 0.5,
			width: 100,
		},
		alt: 'dasdasdas',
	},
	title: 'Summer 2020 Orientation',
};

const card3: OrientationCardModel = {
	fromDate: new Date().toISOString(),
	toDate: new Date().toISOString(),
	locations: ['Newnham'],
	slug:
		'en-us-takashi-murakami-curates-new-healing-group-exhibition-at-perrotin-shanghai',
	snippet:
		'The band’s BlizzCon concert was interrupted with royalty-free music to avoid a copyright violation and takedown order.',
	thumbnail: {
		url: require('images/hero/orientation.png'),
		metadata: {
			height: 100,
			lqip: require('images/hero/orientation.png?lqip'),
			ratio: 0.5,
			width: 100,
		},
		alt: 'dasdasdas',
	},
	title: 'Winter 2020 Orientation',
};

const card4: OrientationCardModel = {
	fromDate: new Date().toISOString(),
	toDate: new Date().toISOString(),
	locations: ['Newnham'],
	slug:
		'en-us-takashi-murakami-curates-new-healing-group-exhibition-at-perrotin-shanghai',
	snippet:
		'The band’s BlizzCon concert was interrupted with royalty-free music to avoid a copyright violation and takedown order.',
	thumbnail: {
		url: require('images/hero/tet.png'),
		metadata: {
			height: 100,
			lqip: require('images/hero/tet.png?lqip'),
			ratio: 0.5,
			width: 100,
		},
		alt: 'dasdasdas',
	},
	title: 'Fall 2019 Orientation',
};

const card5: OrientationCardModel = {
	fromDate: new Date().toISOString(),
	toDate: new Date().toISOString(),
	locations: ['Newnham'],
	slug:
		'en-us-takashi-murakami-curates-new-healing-group-exhibition-at-perrotin-shanghai',
	snippet:
		'The band’s BlizzCon concert was interrupted with royalty-free music to avoid a copyright violation and takedown order.',
	thumbnail: {
		url: require('images/hero/about-us.png'),
		metadata: {
			height: 100,
			lqip: require('images/hero/about-us.png?lqip'),
			ratio: 0.5,
			width: 100,
		},
		alt: 'dasdasdas',
	},
	title: 'Summer 2019 Orientation',
};

export default orientations;
