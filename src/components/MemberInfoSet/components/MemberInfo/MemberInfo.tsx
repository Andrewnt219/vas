import MemberAvatar from '@components/MemberAvatar/MemberAvatar';
import { MemberDocument } from '@lib/prismic/component-types/member/MemberModel';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

type Props = { className?: string; data: MemberDocument };

function MemberInfo({ className, data: { data } }: Props) {
	const { t } = useTranslation();

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
				{data.linked_in && (
					<a
						tw="block underline"
						href={data.linked_in}
						target="_blank"
						rel="noopener noreferrer"
					>
						LinkedIn
					</a>
				)}
				<p>
					{t('common:status')}:{' '}
					{data.is_active ? t('common:active') : t('common:inactive')}
				</p>
			</div>
		</article>
	);
}

export default MemberInfo;
