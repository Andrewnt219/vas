import { useRouteMatch } from '@package/hooks/useRouteMatch/useRouteMatch';
import { Route } from '@src/data/routes-data';
import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import NextLink from 'next/link';
import React, { VFC } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
	data: Route;
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
				<StyledMenuLink>
					{t(`navbar.${i18nKey}`, null, { fallback: 'common:fallback' })}
				</StyledMenuLink>
			</NextLink>
		</div>
	);
};

export const StyledMenuLink = styled.a`
	${tw`text-xl text-center leading-tight font-bold pt-5 inline-block border-t-4 border-transparent transition-colors hocus:(text-primary)`}
	${tw` hocus:(outline-none)`}
`;

export default MenuItem;
