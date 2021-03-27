// TODO move to @types

import { Language } from '@data/localization-data';
import { CategoryModel, categoryModelQuery } from './CategoryModel';
import { HashtagModel, hashtagModelQuery } from './HashtagModel';
import { imageMetadataQuery, ImageModel, imageModelQuery } from './ImageModel';

/**
 * @description the stucture of sanity quired post
 */
export type PostModel = {
	title: string;
	slug: string;
	_createdAt: Date;
	_id: string;
	_lang: Language;
	publishedAt: Date;
	snippet: string;
	location?: string;
	fromDate?: string; // cannot convert nullable
	toDate?: string; // cannot convert nullable
	thumbnail: ImageModel;
	hashtags?: HashtagModel[];
	categories: CategoryModel[];
	postUrl: string;
	hashtagUrl: string;
	body: string;
};

export const postModelQuery = `{
	title,
	"slug": slug.current,
	"_createdAt": dateTime(_createdAt),
	_id,
	_lang,
	"publishedAt": dateTime(publishedAt),
	snippet,
	location,
	fromDate,
	toDate,
	"thumbnail": thumbnail.asset -> ${imageModelQuery},
	"hashtags": hashtags[] -> ${hashtagModelQuery},
	"categories": categories[] -> ${categoryModelQuery},
	"postUrl": "/" + categories[0]->slug.current + "/posts/" + slug.current,
	"hashtagUrl": "/hashtags/" + hashtags[0] -> slug.current,
	body[] {
			...,			
			_type == "image" => {
				...,
				"metadata": @.asset -> metadata ${imageMetadataQuery}
			},
			markDefs[] {
				...,
				_type == "internalLink" => {
					...,
					"url": "/" + @.post-> categories[0]->slug.current + "/posts/" + @.post -> slug.current,
				}
			}
		}
	}`;
