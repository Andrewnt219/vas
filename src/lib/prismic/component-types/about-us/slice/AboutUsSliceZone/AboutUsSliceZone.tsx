import { SliceProps } from '@utils';
import React from 'react';
import 'twin.macro';
import AboutUsHeroSlice from '../AboutUsHeroSlice/AboutUsHeroSlice';
import AboutUsSectionSlice from '../AboutUsSectionSlice';

export type AboutUsSliceZone =
	| SliceProps<typeof AboutUsSectionSlice>
	| SliceProps<typeof AboutUsHeroSlice>;
type Props = { sliceZone: AboutUsSliceZone; className?: string };

function AboutUsSliceZone({ sliceZone, className }: Props) {
	switch (sliceZone.slice_type) {
		case 'hero':
			return (
				<AboutUsHeroSlice className={className} tw="mb-0" slice={sliceZone} />
			);

		case 'section':
			return (
				<AboutUsSectionSlice
					tw="py-10 md:py-20 xl:py-32"
					className={className}
					slice={sliceZone}
				/>
			);

		default:
			return <p tw="text-primary text-8xl">This slice is not supported</p>;
	}
}

export default AboutUsSliceZone;
