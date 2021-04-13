import * as gtag from '@lib/gtag';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useGtagInit = () => {
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = (url: URL) => {
			gtag.pageview(url);
		};

		router.events.on('routeChangeComplete', handleRouteChange);

		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);
};
