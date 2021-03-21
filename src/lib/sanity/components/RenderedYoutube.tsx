import getYouTubeID from 'get-youtube-id';
import React, { ReactElement } from 'react';
import Youtube from 'react-youtube';
import 'twin.macro';

type Props = {
	node: {
		url: string;
	};
};

function RenderedYoutube({ node: { url } }: Props): ReactElement {
	const id = getYouTubeID(url);

	return (
		<div tw="w-full pb-xs relative mb-7 md:mb-10">
			<Youtube tw="absolute-cover" videoId={id ?? 'dQw4w9WgXcQ'} />
		</div>
	);
}

export default RenderedYoutube;
