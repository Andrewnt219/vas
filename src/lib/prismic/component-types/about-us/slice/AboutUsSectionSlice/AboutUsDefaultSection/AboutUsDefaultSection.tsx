import { fonts } from '@styles/_typographyStyles';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import 'twin.macro';
import { AboutUsSectionSliceProps } from '..';
import { aboutUsSerializer } from '../../../about-us-serializer';

type Props = AboutUsSectionSliceProps;

function AboutUsDefaultSection({ className, slice }: Props) {
  return (
    <section
      className={className}
      tw="py-10 col-span-full grid grid-cols-12 md:py-20 xl:py-32"
    >
      <div tw="grid-p-sm xl:grid-p-md">
        <header>
          <h1 css={fonts.sectionTitle}>
            {RichText.asText(slice.primary.title)}
          </h1>

          <RichText
            render={slice.primary.description}
            htmlSerializer={aboutUsSerializer}
          />
        </header>
      </div>
    </section>
  );
}

export default AboutUsDefaultSection;
