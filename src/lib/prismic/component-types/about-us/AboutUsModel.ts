import { Document } from '@prismic-types';
import { AboutUsSliceZone } from './slice/AboutUsSliceZone/AboutUsSliceZone';

export type AboutUsModel = {
	body: AboutUsSliceZone[];
};

export type AboutUsDocument = Document<AboutUsModel>;

export const aboutUsQuery = `{
  about_us {
    ...about_usFields
  }
}`;
