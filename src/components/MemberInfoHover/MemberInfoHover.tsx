import MemberAvatar from '@components/MemberAvatar/MemberAvatar';
import { MemberModel } from '@lib/sanity/models/MemberModel';
import React from 'react';
import { css } from 'twin.macro';

type Props = { className?: string; data: MemberModel };

function MemberInfoHover({ className, data }: Props) {
	return (
		<article
			className={className}
			tw="relative overflow-hidden rounded-lg md:rounded-2xl xl:rounded-4xl "
			css={css`
				:hover > div {
					opacity: 1;
				}
			`}
		>
			<MemberAvatar imageData={data.avatar} />

			<div
				tw="absolute-cover transition-opacity opacity-0 text-white text-lg p-6 flex flex-col justify-end"
				css={css`
					background-image: linear-gradient(
						180deg,
						rgba(0, 0, 0, 0) 0%,
						rgba(0, 0, 0, 0.8) 100%
					);
				`}
			>
				<p tw="font-bold">{data.title}</p>
				<p>{data.position}</p>
			</div>
		</article>
	);
}

export default MemberInfoHover;
