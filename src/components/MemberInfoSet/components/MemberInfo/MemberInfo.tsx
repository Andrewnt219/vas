import MemberAvatar from '@components/MemberInfoSet/components/MemberAvatar/MemberAvatar';
import { MemberModel } from '@lib/sanity/models/MemberModel';
import React from 'react';
import 'twin.macro';

type Props = { className?: string; data: MemberModel };

function MemberInfo({ className, data }: Props) {
	return (
		<article
			className={className}
			tw="grid gap-x-2 grid-cols-3 md:(grid-cols-1 gap-x-0 gap-y-3) xl:gap-y-7"
		>
			<MemberAvatar imageData={data.avatar} />

			<div tw="col-span-2">
				<p tw="font-bold">{data.title}</p>
				<p>{data.position}</p>
				<p>{data.contact.linkedIn}</p>
				<p>Status: {data.isActive ? 'Active' : 'Inactive'}</p>
			</div>
		</article>
	);
}

export default MemberInfo;
