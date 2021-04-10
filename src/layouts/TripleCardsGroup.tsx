import OrientationCard from '@components/OrientationCard/OrientationCard';
import { Post } from '@model';
import React from 'react';

type Props = {
	className?: string;
	data: [Post, Post, Post];
};

function TripleCardsdGroup({ className, data }: Props) {
	const [mainPost, ...sidePosts] = data;

	return (
		<ul
			className={className}
			tw="grid grid-cols-12  gap-x-5 gap-y-8 xl:(grid-rows-2 gap-x-0 gap-y-12 )"
		>
			<li tw="col-span-full xl:(col-span-8 row-span-full  border-r pr-16)">
				<OrientationCard data={mainPost} isMain />
			</li>

			{sidePosts.map((post) => (
				<li
					key={post.id}
					tw="col-span-full md:col-span-6 xl:(col-span-4 row-span-1 pl-16)"
				>
					<OrientationCard data={post} />
				</li>
			))}
		</ul>
	);
}

export function validateTripleCardsGroup(data: Post[]): data is Props['data'] {
	return data.length === 3;
}

export default TripleCardsdGroup;
