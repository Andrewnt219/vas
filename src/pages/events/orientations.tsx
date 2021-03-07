import EventsPage from '@layouts/EventsPage';
import MainLayout from '@layouts/MainLayout';
import { OrientationCardModel } from '@lib/sanity/models/OrientationCardModel';
import React from 'react';
import 'twin.macro';

type Props = { className?: string };

function Orientations({ className }: Props) {
	const posts = [];
	if (posts.length > 3) {
		posts.push('a');
	}
	return (
		<MainLayout title="Orientations" className={className}>
			<EventsPage data={{ posts: cards, bannerProps: data }} />
		</MainLayout>
	);
}

const data = {
	imgAlt: "A picture of sourvenirs from one of VAS's orientations",
	imgLqip: require('images/hero/orientation.png?lqip'),
	imgSrc: require('images/hero/orientation.png'),
	title: 'Orientation',
	subtitle:
		'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
};

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
const cards = [card, card1, card2, card3, card4, card5];

export default Orientations;
