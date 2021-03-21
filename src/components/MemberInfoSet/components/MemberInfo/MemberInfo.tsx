import MemberAvatar from '@components/MemberAvatar/MemberAvatar';
import { AuthorModel } from '@lib/sanity/models/AuthorModel';
import React from 'react';
import 'twin.macro';

type Props = { className?: string; data: AuthorModel };

function MemberInfo({ className, data }: Props) {
	return (
		<article
			className={className}
			tw="grid gap-x-2 grid-cols-3 md:(grid-cols-1 gap-x-0 gap-y-3) xl:gap-y-7"
		>
			<MemberAvatar
				tw="overflow-hidden rounded-2xl md:rounded-4xl"
				imageData={data.thumbnail}
			/>

			<div tw="col-span-2">
				<p tw="font-bold">{data.title}</p>
				<p>{data.positions.join(', ')}</p>
				<a
					tw="block underline"
					href={data.linkedin}
					target="_blank"
					rel="noopener noreferrer"
				>
					LinkedIn
				</a>
				<p>Status: {data.isActive ? 'Active' : 'Inactive'}</p>
			</div>
		</article>
	);
}

export default MemberInfo;
