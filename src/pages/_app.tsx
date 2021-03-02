import Appbar from '@components/Appbar/Appbar';
import Footer from '@components/Footer/Footer';
import GlobalStyles from '@styles/GlobalStyles';
import { AppProps } from 'next/app';
import { ReactElement } from 'react';
import { GlobalStyles as TwGlobalStyles } from 'twin.macro';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
	return (
		<>
			<TwGlobalStyles />
			<GlobalStyles />

			<Appbar />
			<h1 tw="col-span-full text-h1 font-bold text-primary text-center">
				Coming soon
			</h1>
			<Footer />
		</>
	);
}

export default MyApp;
