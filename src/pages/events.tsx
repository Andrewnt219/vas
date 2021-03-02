import EventCard from '@components/EventCard/EventCard';
import MainLayout from '@components/MainLayout/MainLayout';
import PageBanner from '@components/PageBanner/PageBanner';
import { EventCardModel } from '@lib/sanity/EventCardModel';
import React, { VFC } from 'react';
import 'twin.macro';

type Props = {};

const events: VFC<Props> = ({}) => {
	return (
		<MainLayout title="Events">
			<PageBanner
				tw="grid-p-sm"
				data={{
					imgSrc: require('images/hero/events.png'),
					imgLqip: require('images/hero/events.png?lqip'),

					subtitle:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					title: 'Events',
				}}
			/>

			<ul tw="grid-p-sm">
				<EventCard data={card} />
			</ul>
		</MainLayout>
	);
};

const card: EventCardModel = {
	fromDate: new Date().toISOString(),
	toDate: new Date().toISOString(),
	locations: ['Newnham'],
	publishedAt: new Date().toISOString(),
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
	title:
		'Metallica\'s Twitch Performance Got Dubbed Over With Generic "Elevator Music"',
};
export default events;
