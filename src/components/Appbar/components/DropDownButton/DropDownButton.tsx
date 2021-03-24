import { useDropdown } from '@components/Appbar/hooks/useDropdown';
import { useRouteMatch } from '@package/hooks/useRouteMatch/useRouteMatch';
import { Dropdown } from '@src/data/routes-data';
import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import React, { useRef, VFC } from 'react';
import DropDownItemSet from '../DropdownItemSet/DropDownItemSet';
import { StyledMenuLink } from '../MenuItem/MenuItem';

type Props = {
	data: Dropdown;
};

/**
 * @description renders a link or active link in the menu
 */
const DropdownButton: VFC<Props> = ({ data }) => {
	const { i18nKey } = data;

	const { t } = useTranslation('common');

	const containerRef = useRef<HTMLDivElement | null>(null);
	const isVisibleDropdown = useDropdown(containerRef);
	const isActive = useRouteMatch(data.href.toString(), data.exact);

	// TODO fix the top-bar is transitioned from events
	return (
		<div ref={containerRef} tw="relative pb-2">
			{isActive && (
				<motion.div
					layoutId="top-bar"
					tw="absolute top-0 w-full h-1 bg-primary"
				/>
			)}
			<StyledMenuLink
				aria-expanded={isVisibleDropdown}
				aria-haspopup={true}
				as="button"
			>
				{t(`navbar.${i18nKey}`, null, { fallback: 'common:fallback' })}
			</StyledMenuLink>

			<div tw="relative">
				{isVisibleDropdown && <DropDownItemSet data={data.children} />}
			</div>
		</div>
	);
};

export default DropdownButton;
