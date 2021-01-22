import { LinkProps } from 'next/link';
export type RouteValues = Pick<LinkProps, 'href'> & {
	text: string;
	exact?: boolean;
	children?: RouteValues[];
};

export const routes: RouteValues[] = [
	{
		text: 'Home',
		href: '/',
		exact: true,
	},
	{
		text: 'About',
		href: '/about',
	},
	{
		text: 'Blog',
		href: '/blogs',
		children: [
			{
				text: 'Home',
				href: '/',
				exact: true,
			},
			{
				text: 'Inner',
				href: '/blogs',
				children: [
					{
						text: 'Inner',
						href: '/blogs',
						children: [
							{
								text: 'Home',
								href: '/',
								exact: true,
							},
							{
								text: 'Inner',
								href: '/a',
								children: [
									{
										text: 'Home',
										href: '/',
										exact: true,
									},
									{
										text: 'About',
										href: '/about',
									},
									{
										text: 'Projects',
										href: '/projects',
									},
								],
							},
							{
								text: 'About',
								href: '/about',
							},
							{
								text: 'Inner',
								href: '/blogs',
								children: [
									{
										text: 'Home',
										href: '/',
										exact: true,
									},
									{
										text: 'About',
										href: '/about',
									},
									{
										text: 'Projects',
										href: '/projects',
									},
								],
							},
							{
								text: 'Projects',
								href: '/projects',
							},
						],
					},
					{
						text: 'Home',
						href: '/',
						exact: true,
					},
					{
						text: 'About',
						href: '/about',
					},
					{
						text: 'Projects',
						href: '/projects',
					},
				],
			},
			{
				text: 'About',
				href: '/about',
			},
			{
				text: 'Projects',
				href: '/projects',
			},
		],
	},
	{
		text: 'Projects',
		href: '/projects',
	},
];
