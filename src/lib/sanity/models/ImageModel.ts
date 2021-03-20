export type ImageModel = {
	metadata: {
		lqip: string;
		width: number;
		height: number;
		ratio: number;
	};
	url: string;
	alt?: string;
	caption?: string;
};

export const imageModelQuery = `
	{
		url,
		alt,
		caption,
		"metadata": metadata {
			lqip,
			"width": dimensions.width,
			"height": dimensions.height,
			"ratio": dimensions.aspectRatio
		}									
	}
`;
