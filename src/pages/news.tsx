import MainLayout from '@components/MainLayout/MainLayout';
import PageBanner from '@components/PageBanner/PageBanner';
import Pagination from '@components/Pagination/Pagination';
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
					subtitle:
						'Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.',
					title: 'News',
				}}
			/>

			<ul tw="" aria-label="articles about VAS' news"></ul>

			<Pagination
				tw="col-span-full"
				count={1}
				onItemClicked={(ev, page) => console.log(page)}
			/>
		</MainLayout>
	);
};

export default news;
