import { DEFAULT_LANGUAGE, Language } from '@data/localization-data';
import { LocaleDataService } from '@src/server/services/locale-data-service';
import { isValidLocale } from '@utils/validate-utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useLocaleSerivce = (): Language => {
  const { locale } = useRouter();

  useEffect(() => {
    const lang = isValidLocale(locale) ? locale : DEFAULT_LANGUAGE;

    LocaleDataService.setLocale(lang);
    document.cookie = `NEXT_LOCALE=${lang};max-age=60*60*24*365;path=/`;
  }, [locale]);

  return LocaleDataService.getLocale();
};
