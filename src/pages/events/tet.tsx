import EventsPage from '@layouts/EventsPage';
import MainLayout from '@layouts/MainLayout';
import { OrientationCardModel } from '@lib/sanity/models/OrientationCardModel';
import React from 'react';
import 'twin.macro';

type Props = { className?: string };

function Tet({ className }: Props) {
	return (
		<MainLayout title="Tet" className={className}>
			<EventsPage data={{ bannerProps: data, posts: cards }} />
		</MainLayout>
	);
}

const data = {
	imgAlt: "A picture of sourvenirs from one of VAS's orientations",
	imgLqip: require('images/hero/tet.png?lqip'),
	imgSrc: require('images/hero/tet.png'),
	title: 'Tet',
	subtitle:
		'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',
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
	title: 'The most recent Tet',
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
	title: 'Tet 2021',
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
	title: 'Tet 2020',
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
	title: 'Tet 2019',
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
	title: 'Tet 2018',
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
	title: 'Tet 2017',
};
const cards = [card, card1, card2, card3, card4, card5];

export default Tet;
