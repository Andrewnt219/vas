import { useRouteMatch } from '@package/hooks/useRouteMatch/useRouteMatch';
import { Route } from '@src/data/routes-data';
import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import NextLink from 'next/link';
import React, { KeyboardEventHandler, VFC } from 'react';
import tw, { css, styled } from 'twin.macro';
import { StyledMenuLink } from '../MenuItem/MenuItem';

type Props = {
	data: Route;
};

/**
 * @description renders a link or active link in the menu
 */
const DropDownItem: VFC<Props> = ({ data }) => {
	const { href, i18nKey, exact } = data;

	const isActive = useRouteMatch(href.toString(), exact);
	const { t } = useTranslation('common');

	const keyDownCaptureHandler: KeyboardEventHandler<HTMLAnchorElement> = (
		ev
	) => {
		// Prevent propagation to useDropdown
		ev.stopPropagation();
	};

	return (
		<>
			{isActive && (
				<motion.div
					layoutId="side-bar"
					aria-hidden
					tabIndex={-1}
					tw="absolute bottom-0 w-4 h-1  bg-primary"
				/>
			)}
			<NextLink href={href} passHref>
				<CustomMenuLink
					isActive={isActive}
					onKeyDownCapture={keyDownCaptureHandler}
				>
					{t(`navbar.${i18nKey}`, null, { fallback: '...' })}
				</CustomMenuLink>
			</NextLink>
		</>
	);
};

type CustomMenuLinkProps = {
	isActive: boolean;
};
const CustomMenuLink = styled(StyledMenuLink)<CustomMenuLinkProps>`
	${tw`px-0 py-2 hocus:outline-none`}
	${(p) =>
		p.isActive &&
		css`
			${tw`text-primary`}
			${tw`hocus:text-black`}
		`}
`;

export default DropDownItem;
