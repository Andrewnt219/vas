import MemberAvatar from '@components/common/MemberAvatar/MemberAvatar';
import { MemberDocument } from '@lib/prismic/component-types/member/MemberModel';
import { sectionTitle } from '@styles/_typographyStyles';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

type Props = {
  className?: string;
  heading: string;
  members: MemberInfoItemProps['data'][];
};

function MemberInfoSet({ className, heading, members }: Props) {
  return (
    <section
      aria-label={heading}
      className={className}
      tw="md:text-lg xl:text-2xl"
    >
      <header tw="mb-6 md:mb-2xl xl:mb-20">
        <h2 css={sectionTitle} tw="mx-0 after:(mx-0)">
          {heading}
        </h2>
      </header>

      <ul tw="grid grid-cols-12 gap-y-4 md:(gap-y-8 gap-x-4) xl:(gap-y-16 gap-x-8)">
        {members.map((member) => (
          <li tw="col-span-full md:col-span-4 2xl:col-span-3" key={member.id}>
            <MemberInfoItem data={member} />
          </li>
        ))}
      </ul>
    </section>
  );
}

type MemberInfoItemProps = { className?: string; data: MemberDocument };

function MemberInfoItem({ className, data: { data } }: MemberInfoItemProps) {
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
        <p>{data.positions.map((item) => item.position).join(', ')}</p>
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

export default MemberInfoSet;
