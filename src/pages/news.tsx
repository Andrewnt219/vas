import NewsCard from '@components/NewsCard/NewsCard';
import PageBanner from '@components/PageBanner/PageBanner';
import Pagination from '@components/Pagination/Pagination';
import MainLayout from '@src/layouts/MainLayout';
import { ComponentProps } from '@utils';
import React, { VFC } from 'react';
import 'twin.macro';

type Props = {};

const news: VFC<Props> = ({}) => {
	return (
		<MainLayout title="News" tw="">
			<PageBanner
				data={{
					imgSrc: require('images/hero/news.png'),
					imgLqip: require('images/hero/news.png?lqip'),
					imgAlt: 'A table with various souvenirs from Seneca College',
					subtitle:
						'Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.',
					title: 'News',
				}}
			/>

			<ul
				tw="grid-p-sm flex flex-col space-y-6 md:(space-y-12)"
				aria-label="articles about VAS' news"
			>
				<li>
					<NewsCard data={card1} />
				</li>
				<li>
					<NewsCard data={card2} />
				</li>
				<li>
					<NewsCard data={card3} />
				</li>
			</ul>

			<Pagination
				tw="col-span-full"
				count={1}
				onItemClicked={(ev, page) => console.log(page)}
			/>
		</MainLayout>
	);
};

const card1: ComponentProps<typeof NewsCard>['data'] = {
	comments: 20,
	snippet:
		'Get a clear glimpse of the futuristic footwear option from ‘Ye and the Trefoil.',
	title: 'Best Look Yet at the adidas YEEZY 1020 Boot',
	subcategory: 'Footwear',
	thumbnail: {
		url: require('images/hero/events.png'),
		metadata: {
			height: 100,
			lqip: require('images/hero/events.png?lqip'),
			ratio: 0.5,
			width: 100,
		},
	},
	views: 12,
};
const card2: ComponentProps<typeof NewsCard>['data'] = {
	comments: 0,
	snippet:
		'Get a clear glimpse of the futuristic footwear option from ‘Ye and the Trefoil.',
	title: 'Best Look Yet at the adidas YEEZY 1020 Boot',
	subcategory: 'Footwear',
	thumbnail: {
		url: require('images/hero/tet.png'),
		metadata: {
			height: 100,
			lqip: require('images/hero/tet.png?lqip'),
			ratio: 0.5,
			width: 100,
		},
	},
	views: 0,
};
const card3: ComponentProps<typeof NewsCard>['data'] = {
	comments: 3,
	snippet:
		'Get a clear glimpse of the futuristic footwear option from ‘Ye and the Trefoil.',
	title:
		'Bianca Saunders Superimposes Creased Denim Onto Wrangler Pieces for FW21',
	subcategory: 'Footwear',
	thumbnail: {
		url: require('images/hero/orientation.png'),
		metadata: {
			height: 100,
			lqip: require('images/hero/orientation.png?lqip'),
			ratio: 0.5,
			width: 100,
		},
	},
	views: 1,
};

export default news;
