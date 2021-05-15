import { DEFAULT_LANGUAGE } from '@data/localization-data';
import { isValidLocale } from '@utils/validate-utils';
import dayjs from 'dayjs';
import 'dayjs/locale/en-ca';
import 'dayjs/locale/vi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useLocale = () => {
  useDayjsLocale();
  useCookieLocale();
};

const useDayjsLocale = () => {
  const { locale } = useRouter();

  switch (locale) {
    case 'vi':
      dayjs.locale('vi');
      return;

    default:
      dayjs.locale('en-ca');
      return;
  }
};

const useCookieLocale = () => {
  const { locale } = useRouter();

  useEffect(() => {
    const lang = isValidLocale(locale) ? locale : DEFAULT_LANGUAGE;

    document.cookie = `NEXT_LOCALE=${lang};max-age=60*60*24*365;path=/`;
  }, [locale]);
};
