import { LinkProps } from 'next/link';
export type RouteValues = Pick<LinkProps, 'href'> & {
	text: string;
	exact?: boolean;
	children?: RouteValues[];
};

/**
 * @description routes for navigation bar
 */
export const routes: RouteValues[] = [
	{
		text: 'Home',
		href: '/',
		exact: true,
	},
	{
		text: 'What is VAS',
		href: '/about-us',
	},
	{
		text: 'Events',
		href: '/events',
	},
	{
		text: 'News',
		href: '/news',
	},
	{
		text: 'Our Partners',
		href: '/partners',
	},
	{
		// eslint-disable-next-line quotes
		text: "Let's Connect",
		href: '/contact-us',
	},
];
