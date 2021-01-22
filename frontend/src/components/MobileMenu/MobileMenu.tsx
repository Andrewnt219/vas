import { routes } from '@src/data/routes-data';
import React, { VFC } from 'react';
import tw, { styled } from 'twin.macro';
import MenuItemSet from '../MenuItemSet/MenuItemSet';

type MobileMenuProps = {};

const MobileMenu: VFC<MobileMenuProps> = ({}) => {
	return (
		<MobileMenuContainer>
			<MenuItemSet data={routes} />
		</MobileMenuContainer>
	);
};

type MobileMenuContainerProps = {};
const MobileMenuContainer = styled.div<MobileMenuContainerProps>`
	${tw`md:hidden`}
`;
export default MobileMenu;
