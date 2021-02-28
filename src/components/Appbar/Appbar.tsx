import Logo from '@components/Logo/Logo';
import { routes } from '@src/data/routes-data';
import React, { VFC } from 'react';
import 'twin.macro';
import MenuItemSet from './components/MenuItemSet/MenuItemSet';
type Props = {};

// TODO responsive
/**
 * @description renders the navigation bar
 */
const Appbar: VFC<Props> = ({}) => {
	return (
		<header tw="col-span-full" role="banner">
			<nav tw="grid grid-cols-12 ">
				<a tw="sr-only focus:not-sr-only" href="#skip">
					Skip to content
				</a>

				<Logo tw="col-start-2 col-end-3" />

				<MenuItemSet
					tw="hidden lg:flex col-start-6 col-end-12 justify-end"
					data={routes}
				/>
			</nav>
		</header>
	);
};

export default Appbar;
