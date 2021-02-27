import { LinkProps } from 'next/link';
export type RouteValues = Pick<LinkProps, 'href'> & {
	i18nKey: string;
	exact?: boolean;
	children?: RouteValues[];
};

/**
 * @description routes for navigation bar
 */
export const routes: RouteValues[] = [
	{
		i18nKey: 'home',
		href: '/',
		exact: true,
	},
	{
		i18nKey: 'about-us',
		href: '/about-us',
	},
	{
		i18nKey: 'events',
		href: '/events',
	},
	{
		i18nKey: 'news',
		href: '/news',
	},
	{
		i18nKey: 'partners',
		href: '/partners',
	},
	{
		// eslint-disable-next-line quotes
		i18nKey: 'contact-us',
		href: '/contact-us',
	},
];
