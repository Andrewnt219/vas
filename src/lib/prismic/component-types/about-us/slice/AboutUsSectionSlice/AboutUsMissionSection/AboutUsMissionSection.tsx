import { SectionH1 } from '@components/SectionH1/SectionH1';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import tw, { css } from 'twin.macro';
import { AboutUsSectionSliceProps } from '..';
import { AboutUsSerializer } from '../../../serializer/AboutUsSerializer/AboutUsSerializer';

type Props = AboutUsSectionSliceProps;

function AboutUsMissionSection({ className, slice }: Props) {
  return (
    <section
      className={className}
      tw="grid grid-cols-12 relative"
      css={sectionCss}
    >
      <div tw="grid-p-sm xl:(grid-p-md)">
        <header>
          <SectionH1>{RichText.asText(slice.primary.title)}</SectionH1>
        </header>

        <RichText
          render={slice.primary.description}
          htmlSerializer={AboutUsSerializer}
        />
      </div>
    </section>
  );
}

const sectionCss = css`
  // The last 8 is for decoration
  img {
    &:nth-last-child(-n + 8) {
      ${tw`hidden xl:(block col-span-1 absolute )`}
    }

    &:nth-last-child(1) {
      width: 25rem;
      left: 5%;
      top: 20%;
    }

    &:nth-last-child(2) {
      width: 35rem;
      right: 0;
      top: -10%;
      position: absolute;
    }
    &:nth-last-child(3) {
      left: 0;
      top: 45%;
      width: 35rem;
    }

    &:nth-last-child(4) {
      right: 0;
      top: 50%;
      width: 20rem;
    }

    &:nth-last-child(5) {
      right: 0;
      top: 10%;
      width: 30rem;
    }
    &:nth-last-child(6) {
      left: 0;
      top: -5%;
      width: 20rem;
    }

    &:nth-last-child(7) {
      left: 0;
      top: 20%;
      width: 35rem;
    }

    &:nth-last-child(8) {
      top: 35%;
      right: 0;
      width: 30rem;
    }
  }
`;
export default AboutUsMissionSection;
