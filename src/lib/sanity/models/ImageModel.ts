export type ImageMetaDataModel = {
	lqip: string;
	width: number;
	height: number;
	ratio: number;
};

export type ImageModel = {
	metadata: ImageMetaDataModel;
	url: string;
	alt?: string;
	caption?: string;
};

export const imageMetadataQuery = `
		{
			lqip,
			"width": dimensions.width,
			"height": dimensions.height,
			"ratio": dimensions.aspectRatio
		}
`;

export const imageModelQuery = `
	{
		url,
		alt,
		caption,
		"metadata": metadata ${imageMetadataQuery}					
	}
`;
