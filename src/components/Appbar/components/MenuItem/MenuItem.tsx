import { RouteValues } from '@src/data/routes-data';
import { useRouteMatch } from '@src/package/hooks/useRouteMatch';
import useTranslation from 'next-translate/useTranslation';
import NextLink from 'next/link';
import React, { VFC } from 'react';
import tw, { css, styled } from 'twin.macro';

type Props = {
	data: RouteValues;
};

// TODO framer animated layout for the active bar. This means extract the bar to an element, not border
/**
 * @description renders a link or active link in the menu
 */
const MenuItem: VFC<Props> = ({ data }) => {
	const { href, i18nKey, exact } = data;

	const isActive = useRouteMatch(href.toString(), exact);
	const { t } = useTranslation('common');

	return (
		<NextLink href={href} passHref>
			<Anchor isActive={isActive}>{t(`navbar.${i18nKey}`)}</Anchor>
		</NextLink>
	);
};

const activeLinkCss = css`
	${tw` border-primary `}
`;
type AnchorProps = { isActive: boolean };
const Anchor = styled.a<AnchorProps>`
	${tw`text-xl text-center leading-tight font-bold pt-5 inline-block border-t-4 border-transparent transition-colors`}
	${tw`hocus:(text-primary)`}

	${(p) => p.isActive && activeLinkCss}
`;
export default MenuItem;
