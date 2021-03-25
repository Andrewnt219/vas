import Appbar from '@components/Appbar/Appbar';
import { SliderProvider } from '@components/Appbar/SliderContext';
import Footer from '@components/Footer/Footer';
import { useLocaleSerivce } from '@src/hooks/useLocaleService';
import GlobalStyles from '@styles/GlobalStyles';
import { AppProps } from 'next/app';
import { ReactElement } from 'react';
import { GlobalStyles as TwGlobalStyles } from 'twin.macro';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
	useLocaleSerivce();

	return (
		<SliderProvider>
			<TwGlobalStyles />
			<GlobalStyles />

			<Appbar />
			<Component {...pageProps} />
			<Footer />
		</SliderProvider>
	);
}

export default MyApp;
