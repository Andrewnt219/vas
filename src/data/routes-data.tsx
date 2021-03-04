import { LinkProps } from 'next/link';

type CommonProps = Pick<LinkProps, 'href'> & {
	i18nKey: string;
	exact?: boolean;
};

export type Route = CommonProps & {
	type: 'route';
};

export type Dropdown = CommonProps & {
	type: 'dropdown';

	children: (Route | Dropdown)[];
};

/**
 * @description routes for navigation bar
 */
export const routes: (Route | Dropdown)[] = [
	{
		type: 'route',
		i18nKey: 'home',
		href: '/',
		exact: true,
	},
	{
		type: 'route',
		i18nKey: 'about-us',
		href: '/about-us',
	},
	{
		type: 'dropdown',
		i18nKey: 'events.index',
		exact: false,
		href: '/events',
		children: [
			{
				type: 'route',
				i18nKey: 'events.orientations',
				href: '/events/orientations',
			},
			{ type: 'route', i18nKey: 'events.tet', href: '/events/tet' },
			{ type: 'route', i18nKey: 'events.index', href: '/events', exact: true },
		],
	},
	{
		type: 'route',
		i18nKey: 'news',
		href: '/news',
	},
	{
		type: 'route',
		i18nKey: 'partners',
		href: '/partners',
	},
	{
		type: 'route', // eslint-disable-next-line quotes
		i18nKey: 'contact-us',
		href: '/contact-us',
	},
];
