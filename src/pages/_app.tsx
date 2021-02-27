import Appbar from '@components/Appbar/Appbar';
import Footer from '@components/Footer/Footer';
import GlobalStyles from '@styles/GlobalStyles';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { GlobalStyles as TwGlobalStyles } from 'twin.macro';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
	const { locale, asPath } = useRouter();
	return (
		<>
			<DefaultSeo
				openGraph={{
					type: 'website',
					locale,
					url: '',
				}}
			/>
			<TwGlobalStyles />
			<GlobalStyles />

			<Appbar />
			<Component {...pageProps} />
			<Footer />
		</>
	);
}

export default MyApp;
