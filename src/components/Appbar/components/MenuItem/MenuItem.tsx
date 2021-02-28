import { RouteValues } from '@src/data/routes-data';
import { useRouteMatch } from '@src/package/hooks/useRouteMatch';
import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import NextLink from 'next/link';
import React, { VFC } from 'react';
import 'twin.macro';

type Props = {
	data: RouteValues;
};

/**
 * @description renders a link or active link in the menu
 */
const MenuItem: VFC<Props> = ({ data }) => {
	const { href, i18nKey, exact } = data;

	const isActive = useRouteMatch(href.toString(), exact);
	const { t } = useTranslation('common');

	return (
		<div tw="relative">
			{isActive && (
				<motion.div
					layoutId="top-bar"
					tw="absolute top-0 w-full h-1 bg-primary"
				/>
			)}
			<NextLink href={href} passHref>
				<a tw="text-xl text-center leading-tight font-bold pt-5 inline-block border-t-4 border-transparent transition-colors hocus:(text-primary)">
					{t(`navbar.${i18nKey}`, null, { fallback: '...' })}
				</a>
			</NextLink>
		</div>
	);
};

export default MenuItem;
