import { useMenuState } from '@src/contexts/MenuStateContext/MenuStateContext';
import {
	useTheme,
	useThemeUpdater,
} from '@src/contexts/ThemeContext/ThemeContext';
import { routes } from '@src/data/routes-data';
import React, { VFC } from 'react';
import tw, { styled } from 'twin.macro';
import Burger from '../Burger/Burger';
import MenuItemSet from '../MenuItemSet/MenuItemSet';

type Props = {};

const Navbar: VFC<Props> = ({}) => {
	const setTheme = useThemeUpdater();
	const theme = useTheme();

	const [isOpenedMenu, setIsOpenedMenu] = useMenuState();

	const handleBurgerClick = () => {
		setIsOpenedMenu((prev) => !prev);
	};

	const handleThemeButonClick = () => {
		theme === 'dark' ? setTheme('light') : setTheme('dark');
	};

	return (
		<Nav>
			<SkipLink href="#skip">Skip to content</SkipLink>
			<button aria-label="Toggle Dark Mode" onClick={handleThemeButonClick}>
				{theme}
			</button>
			<Burger isActive={isOpenedMenu} handleClick={handleBurgerClick} />

			<MenuItemSetCustom data={routes} />
		</Nav>
	);
};

type NavProps = {};
const Nav = styled.nav<NavProps>`
	${tw`sticky top-0 `}
	${tw`flex justify-between items-center max-w-4xl w-full p-8 my-0 mx-auto`}
	${tw`bg-white dark:bg-black`} // necessary for a smooth transition with main
	${tw`transition-colors duration-500`}
`;

type SkipLinkProps = {};
const SkipLink = styled.a<SkipLinkProps>`
	${tw`sr-only focus:not-sr-only`}
`;

const MenuItemSetCustom = styled(MenuItemSet)`
	${tw`hidden md:flex`}
`;

export default Navbar;
