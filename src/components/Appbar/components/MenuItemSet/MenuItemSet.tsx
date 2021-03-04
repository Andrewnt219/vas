import { routes } from '@src/data/routes-data';
import { AnimateSharedLayout } from 'framer-motion';
import React, { VFC } from 'react';
import tw, { styled } from 'twin.macro';
import DropdownButton from '../DropDownButton/DropDownButton';
import MenuItem from '../MenuItem/MenuItem';

type Props = {
	data: typeof routes;
	className?: string;
};

/**
 * @description renders a set of navigation links
 */
const MenuItemSet: VFC<Props> = ({ data, className }) => {
	return (
		<AnimateSharedLayout>
			<Container className={className}>{renderMenuItems(data)}</Container>
		</AnimateSharedLayout>
	);
};

function renderMenuItems(items: typeof routes) {
	return items.map((item, index) => (
		<li key={index}>
			{item.type === 'route' ? (
				<MenuItem data={item} />
			) : (
				<DropdownButton data={item} />
			)}
		</li>
	));
}
type ContainerProps = {};
const Container = styled.ul<ContainerProps>`
	${tw`space-x-10 flex`}

	& > li:last-of-type a {
		${tw`text-primary`}

		${tw`hocus:text-black`}
	}
`;

export default MenuItemSet;
