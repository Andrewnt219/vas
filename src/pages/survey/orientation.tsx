import OrientationPage from '@src/components/pages/SurveyOrientationPage';
import Head from 'next/head';
import React, { ReactElement } from 'react';

type Props = {};

function orientation({}: Props): ReactElement {
	return (
		<>
			<Head>
				<title>VAS Survey Winter Orientation 2021</title>
				{/* OG */}
				<meta key="ogType" name="og:type" content="website" />
				<meta key="ogSiteName" name="og:site-name" content="VAS" />

				<meta
					key="ogUrl"
					property="og:image"
					content="http://vasseneca.com/survey/orientation/"
				/>

				<meta
					key="ogUrl"
					property="og:image:secure_url"
					content="http://vasseneca.com/survey/orientation/"
				/>
				<meta key="ogImage" property="og:image" content="/og-image.png" />
				<meta key="ogImageWidth" name="og:image:width" content="1903" />
				<meta key="ogImageHeight" name="og:image:height" content="945" />
				<meta
					key="ogTitle"
					name="og:title"
					content="VAS Survey Winter Orientation 2021"
				/>
				<meta
					key="ogDescription"
					name="og:description"
					content="Help VAS make better orientations by filling in a short survey"
				/>
			</Head>
			<OrientationPage />
		</>
	);
}

export default orientation;
