import GlobalStyles from '@styles/GlobalStyles';
import { AppProps } from 'next/app';
import { ReactElement } from 'react';
import { GlobalStyles as TwGlobalStyles } from 'twin.macro';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
	return (
		<>
			<TwGlobalStyles />
			<GlobalStyles />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
