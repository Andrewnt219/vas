// TODO move to @types

import { CategoryModel, categoryModelQuery } from './CategoryModel';
import { HashtagModel, hashtagModelQuery } from './HashtagModel';
import { imageMetadataQuery, ImageModel, imageModelQuery } from './ImageModel';

/**
 * @description the stucture of sanity quired post
 */
export type PostModel = {
	title: string;
	slug: string;
	body: string;
	_createdAt: string;
	_id: string;
	_lang: string;
	publishedAt: string;
	snippet: string;
	location?: string;
	fromDate?: string;
	toDate?: string;
	thumbnail: ImageModel;
	hashtags: HashtagModel[];
	categories: CategoryModel[];
};

// TODO make a class with public class fields to prepare all the data
export const postModelQuery = `{
	...,
	"thumbnail": thumbnail.asset -> ${imageModelQuery},
	"categories": categories[] -> ${categoryModelQuery},
	"hashtags": hashtags[] -> ${hashtagModelQuery},
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
