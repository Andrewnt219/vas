// TODO move to @types

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
	locations: string[];
	fromDate: string;
	toDate: string;
	thumbnail: ImageModel;
};

// TODO make a class with public class fields to prepare all the data
export const postModelQuery = `{
	...,
	"thumbnail": thumbnail.asset -> ${imageModelQuery}, 	
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
					"url": "/" + @.post->slug.current,
				}
			}
		}
	}`;
