import Button from '@components/Button/Button';
import EnhancedImage from '@components/EnhancedImage/EnhancedImage';
import PublishedDate from '@components/PublishedDate/PublishedDate';
import { EventCardModel } from '@lib/sanity/models/EventCardModel';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import React from 'react';

type Props = { className?: string; data: EventCardModel };

function EventCard({ className, data }: Props) {
	return (
		<article className={className} tw="space-y-4 xl:space-y-14">
			<PublishedDate date={new Date(data.publishedAt)} />

			<h2 tw=" font-bold text-xl md:text-title">
				<NextLink href={`/events/posts/${data.slug}`}>
					<a>{data.title}</a>
				</NextLink>
			</h2>

			<div tw="grid md:grid-cols-2  text-body font-medium md:text-lg">
				<div tw="relative col-span-full pb-xs mb-4 md:(mb-6 pb-2xs)">
					<NextLink href={`/events/posts/${data.slug}`}>
						<a>
							<EnhancedImage
								tw="img-absolute absolute!"
								src={data.thumbnail.url}
								lqip={data.thumbnail.metadata.lqip}
								alt={data.thumbnail.alt ?? ''}
								layout="fill"
							/>
						</a>
					</NextLink>
				</div>

				<p>
					Time:{' '}
					<time dateTime={dayjs(data.fromDate).format('MMM DD')}>
						{dayjs(data.fromDate).format('MMM DD')}
					</time>{' '}
					{data.toDate && (
						<>
							&#8211;{' '}
							<time dateTime={dayjs(data.toDate).format('MMM DD')}>
								{dayjs(data.toDate).format('MMM DD')}
							</time>
						</>
					)}
				</p>

				<p tw="md:text-right">Location: {data.location}</p>
			</div>

			<div tw="text-base text-gray-200 md:text-newsBody">
				<p tw="mb-4 md:mb-6">{data.snippet}</p>

				<NextLink href={`/events/posts/${data.slug}`} passHref>
					<Button as="a" variant="link" tw="italic">
						Read more ...
					</Button>
				</NextLink>
			</div>
		</article>
	);
}

export default EventCard;
