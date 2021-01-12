import GlobalStyles from '@/styles/GlobalStyles';
import { ReactElement } from 'react';
import { GlobalStyles as TwGlobalStyles } from 'twin.macro';
import { AppProps } from 'next/app';

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
