import Logo from '@components/Logo/Logo';
import { routes } from '@src/data/routes-data';
import React, { VFC } from 'react';
import 'twin.macro';
import MenuItemSet from './components/MenuItemSet/MenuItemSet';
type Props = {};

/**
 * @description renders the navigation bar
 */
const Appbar: VFC<Props> = ({}) => {
	return (
		<nav tw="grid grid-cols-12 col-span-full">
			<Logo tw="col-start-2 col-end-3" />

			<MenuItemSet tw="col-start-6 col-end-12 justify-end" data={routes} />
		</nav>
	);
};

export default Appbar;
