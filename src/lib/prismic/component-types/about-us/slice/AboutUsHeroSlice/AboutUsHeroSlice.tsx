import PageBanner from '@components/common/PageBanner/PageBanner';
import { SliceComponentProps } from '@prismic-slices';
import { Asset } from '@prismic-types';
import Head from 'next/head';
import { RichTextBlock } from 'prismic-reactjs';
import React from 'react';
import 'twin.macro';

type SliceProps = {
  slice_type: 'hero';
  slice_label: null;
  items: unknown[];
  primary: {
    title: string;
    description: RichTextBlock[];
    thumbnail: Asset;
  };
};
type Props = SliceComponentProps<SliceProps>;

function AboutUsHeroSlice({ className, slice }: Props) {
  return (
    <>
      <Head>
        <title>{slice.primary.title}</title>
      </Head>

      <PageBanner className={className} data={slice.primary} />
    </>
  );
}

export default AboutUsHeroSlice;
