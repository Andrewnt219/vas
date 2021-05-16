import Appbar from '@components/common/Appbar/Appbar';
import Footer from '@components/common/Footer/Footer';
import { SliderProvider } from '@components/common/Slider/SliderContext';
import { useGtagInit } from '@src/hooks/useGtagInit';
import { useLocale } from '@src/hooks/useLocale';
import GlobalStyles from '@styles/GlobalStyles';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import { GlobalStyles as TwGlobalStyles } from 'twin.macro';

function MyApp({ Component, pageProps }: AppProps) {
  useLocale();
  useGtagInit();

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
