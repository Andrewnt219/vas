import Burger from '@components/Burger/Burger';
import Logo from '@components/Logo/Logo';
import Slider from '@components/Slider/Slider';
import { routes } from '@src/data/routes-data';
import React, { useState, VFC } from 'react';
import MenuItemSet from './components/MenuItemSet/MenuItemSet';

type Props = {};

// TODO responsive
/**
 * @description renders the navigation bar
 */
const Appbar: VFC<Props> = ({}) => {
	const [isActive, setIsActive] = useState(false);

	return (
		<header tw="col-span-full z-40" role="banner">
			<nav tw="grid grid-cols-12">
				<a tw="sr-only focus:not-sr-only" href="#skip">
					Skip to content
				</a>

				<Logo tw="col-start-1 col-end-4  md:col-end-3 xl:(col-start-2 col-end-3)" />

				<Burger
					tw="col-start-11 col-end-13 justify-self-center self-center"
					isActive={isActive}
					handleClick={() => setIsActive((prev) => !prev)}
				/>

				{isActive && <Slider />}
				<MenuItemSet
					tw="hidden xl:(flex col-start-4 col-end-12 justify-end)"
					data={routes}
				/>
			</nav>
		</header>
	);
};

export default Appbar;
