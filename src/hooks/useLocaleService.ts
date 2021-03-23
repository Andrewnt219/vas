import { Language } from '@data/localization-data';
import { LocaleDataService } from '@services/locale-data-service';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useLocaleSerivce = (): Language => {
	const { locale } = useRouter();

	useEffect(() => {
		LocaleDataService.setLocale(locale);
	}, [locale]);

	return LocaleDataService.getLocale();
};
