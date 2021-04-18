import React from 'react';
import 'twin.macro';

type Props = {
	fonts: ('300' | '300italic' | '700' | '900' | 'italic' | 'regular')[];
};

const FONT_NAME = 'nunito-sans-v6-vietnamese_latin';

function FontPrefetch({ fonts }: Props) {
	return (
		<>
			{fonts.map((font) => (
				<link
					key={font}
					rel="preload"
					href={`/fonts/${FONT_NAME}-${font}.woff2`}
					as="font"
					type="font/woff2"
					crossOrigin=""
				/>
			))}
		</>
	);
}

export default FontPrefetch;
