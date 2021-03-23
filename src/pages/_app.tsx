import Appbar from '@components/Appbar/Appbar';
import Footer from '@components/Footer/Footer';
import { useLocaleSerivce } from '@src/hooks/useLocaleService';
import GlobalStyles from '@styles/GlobalStyles';
import { AppProps } from 'next/app';
import { ReactElement } from 'react';
import { GlobalStyles as TwGlobalStyles } from 'twin.macro';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
	useLocaleSerivce();

	return (
		<>
			<TwGlobalStyles />
			<GlobalStyles />

			<Appbar />
			<Component {...pageProps} />
			<Footer />
		</>
	);
}

export default MyApp;
