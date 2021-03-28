import MemberAvatar from '@components/MemberAvatar/MemberAvatar';
import { AuthorModel } from '@lib/sanity/models/AuthorModel';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

type Props = { className?: string; data: AuthorModel };

function MemberInfo({ className, data }: Props) {
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
				{data.linkedin && (
					<a
						tw="block underline"
						href={data.linkedin}
						target="_blank"
						rel="noopener noreferrer"
					>
						LinkedIn
					</a>
				)}
				<p>
					{t('common:status')}:{' '}
					{data.isActive ? t('common:active') : t('common:inactive')}
				</p>
			</div>
		</article>
	);
}

export default MemberInfo;
