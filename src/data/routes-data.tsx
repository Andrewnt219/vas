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
    type: 'dropdown',
    i18nKey: 'about-us.text',
    href: '/about-us',

    children: [
      {
        type: 'route',
        href: '/about-us',
        i18nKey: 'about-us.index',
        exact: true,
      },
      { type: 'route', href: '/about-us/members', i18nKey: 'about-us.members' },
      {
        type: 'route',
        href: '/about-us/partners',
        i18nKey: 'about-us.partners',
      },
    ],
  },
  {
    type: 'dropdown',
    i18nKey: 'posts.text',
    exact: false,
    href: '/categories',
    children: [
      {
        type: 'route',
        i18nKey: 'posts.events',
        href: '/categories/event',
        exact: true,
      },
      {
        type: 'route',
        i18nKey: 'posts.blog',
        href: '/categories/blog',
      },
      {
        type: 'route',
        i18nKey: 'posts.orientations',
        href: '/categories/orientation',
      },
      { type: 'route', i18nKey: 'posts.tet', href: '/categories/tet' },
      {
        type: 'route',
        i18nKey: 'posts.news',
        href: '/categories/news',
      },
    ],
  },
  {
    type: 'route',
    i18nKey: 'contact-us',
    href: '/contact-us',
  },
];
