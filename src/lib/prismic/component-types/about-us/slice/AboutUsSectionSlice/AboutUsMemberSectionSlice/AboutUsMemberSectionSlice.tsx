import MemberAvatar from '@components/common/MemberAvatar/MemberAvatar';
import { useMembers } from '@contexts/MembersContext';
import { SizesProvider } from '@contexts/SizesContext';
import { MemberModel } from '@lib/prismic/component-types/member/MemberModel';
import { sectionTitle } from '@styles/_typographyStyles';
import { getSizes } from '@utils/css-utils';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import { css } from 'twin.macro';
import { AboutUsSectionSliceProps } from '..';

type Props = AboutUsSectionSliceProps;

function AboutUsMemberSectionSlice({ className, slice }: Props) {
  const members = useMembers();

  return (
    <section
      className={className}
      tw="mx-4 px-8 rounded-lg  bg-gradient-to-b from-gray-400 to-white  md:(rounded-4xl mx-10 px-16) xl:(rounded-4xl mx-14 px-32) "
    >
      <header>
        <h1 css={sectionTitle}>{RichText.asText(slice.primary.title)}</h1>
      </header>

      <SizesProvider
        initialContext={getSizes(['80vw', '15vw', undefined, '20vw'])}
      >
        <ul tw="grid gap-y-8 md:(grid-cols-3 gap-x-8 gap-y-16) 2xl:grid-cols-4">
          {members.map((member) => (
            <li key={member.id}>
              <MemberInfoHover data={member.data} />
            </li>
          ))}
        </ul>
      </SizesProvider>
    </section>
  );
}

type MemberInfoHoverProps = { className?: string; data: MemberModel };

function MemberInfoHover({ className, data }: MemberInfoHoverProps) {
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
      <MemberAvatar imageData={data.thumbnail} />

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
        <p>{data.positions.map((item) => item.position).join(', ')}</p>
      </div>
    </article>
  );
}

export default AboutUsMemberSectionSlice;
