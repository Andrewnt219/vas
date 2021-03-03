import EventCard from '@components/EventCard/EventCard';
import MainLayout from '@components/MainLayout/MainLayout';
import PageBanner from '@components/PageBanner/PageBanner';
import Pagination from '@components/Pagination/Pagination';
import { EventCardModel } from '@lib/sanity/models/EventCardModel';
import React, { VFC } from 'react';
import 'twin.macro';

type Props = {};

const Events: VFC<Props> = ({}) => {
	return (
		<MainLayout title="Events" tw="">
			<PageBanner
				data={{
					imgSrc: require('images/hero/events.png'),
					imgLqip: require('images/hero/events.png?lqip'),
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
				<li>
					<EventCard data={card} />
				</li>
				<li>
					<EventCard data={card2} />
				</li>
				<li>
					<EventCard data={card3} />
				</li>
			</ul>

			<Pagination
				tw="col-span-full"
				count={20}
				onItemClicked={(ev, page) => console.log(page)}
			/>
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
const card2: EventCardModel = {
	fromDate: new Date().toISOString(),
	toDate: new Date().toISOString(),
	locations: ['Newnham'],
	publishedAt: new Date().toISOString(),
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
	title:
		'Metallica\'s Twitch Performance Got Dubbed Over With Generic "Elevator Music"',
};
const card3: EventCardModel = {
	fromDate: new Date().toISOString(),
	toDate: new Date().toISOString(),
	locations: ['Newnham'],
	publishedAt: new Date().toISOString(),
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
	title:
		'Metallica\'s Twitch Performance Got Dubbed Over With Generic "Elevator Music"',
};
export default Events;
