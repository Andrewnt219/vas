import { useRouter } from 'next/router';

export const useCurrentLocation = (): string => {
	const { asPath, locale } = useRouter();

	return `https://vasseneca.com/${locale}${asPath}`;
};
