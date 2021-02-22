import { RouteValues } from '@src/data/routes-data';
import { VFC } from 'react';
import tw, { styled } from 'twin.macro';
import MenuItem from './components/MenuItem/MenuItem';

type Props = {
	data: RouteValues[];
	className?: string;
};

const MenuItemSet: VFC<Props> = ({ data, className }) => {
	return (
		<MenuItemSetContainer className={className}>
			{data.map((route) => (
				<li key={route.href.toString()}>
					<MenuItem data={route} />
				</li>
			))}
		</MenuItemSetContainer>
	);
};

type MenuItemSetContainerProps = {};
const MenuItemSetContainer = styled.ul<MenuItemSetContainerProps>`
	${tw`p-4`}
`;

export const MenuDropdownItemSet = styled(MenuItemSet)`
	${tw` `}
`;

export default MenuItemSet;
