import EnhancedImage from '@components/EnhancedImage/EnhancedImage';
import { EventCardModel } from '@lib/sanity/EventCardModel';
import { Semester } from '@src/data/common-data';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import React from 'react';
import 'twin.macro';
type Props = { className?: string; data: EventCardModel };

function EventCard({ className, data }: Props) {
	return (
		<article className={className} tw="space-y-4 xl:space-y-14">
			<div tw="relative pl-5 before:(content absolute top-0 left-0 h-full w-1 block bg-primary)">
				<time dateTime={dayjs(data.publishedAt).format()}>
					{dayjs(data.publishedAt).format('DD MMMM YYYY')}
				</time>
				<p>{determineSemester(new Date(data.publishedAt))}</p>
			</div>

			<h2 tw=" font-bold text-xl md:text-title">{data.title}</h2>

			<div tw="grid md:grid-cols-2  text-body font-medium md:text-lg">
				<div tw="relative col-span-full pb-xs mb-4 md:(mb-6 pb-2xs)">
					<EnhancedImage
						tw="absolute-cover all:object-cover bg-no-repeat bg-cover bg-center"
						src={data.thumbnail.url}
						lqip={data.thumbnail.metadata.lqip}
						layout="fill"
					/>
				</div>

				<p>
					Time:{' '}
					<time dateTime={dayjs(data.fromDate).format()}>
						{dayjs(data.fromDate).format('MMM DD')}
					</time>{' '}
					&#8211;{' '}
					<time dateTime={dayjs(data.toDate).format()}>
						{dayjs(data.toDate).format('MMM DD')}
					</time>
				</p>

				<p tw="md:text-right">Location: {data.locations.join('& ')}</p>
			</div>

			<div tw="text-base text-gray-200 md:text-newsBody">
				<p tw="mb-4 md:mb-6">{data.snippet}</p>

				<NextLink href={`/posts/${data.slug}`} passHref>
					<a tw="italic underline decorator-transparent  hocus:(outline-none decorator-primary text-primary) transition-colors ">
						Read more ...
					</a>
				</NextLink>
			</div>
		</article>
	);
}

function determineSemester(date: Date): Semester {
	// Jan-Apr
	if (date.getMonth() < 4) {
		return Semester.WINTER;
	}

	// May-Aug
	if (date.getMonth() < 8) {
		return Semester.SUMMER;
	}

	// Sep-Dec
	return Semester.FALL;
}

export default EventCard;
