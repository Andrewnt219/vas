import Logo from '@components/common/Logo/Logo';
import Slider from '@components/common/Slider/Slider';
import { routes } from '@src/data/routes-data';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, VFC } from 'react';
import { css } from 'twin.macro';
import { useSlider } from '../Slider/SliderContext';
import Burger from './components/Burger/Burger';
import MenuItemSet from './components/MenuItemSet/MenuItemSet';

type Props = {};

/**
 * @description renders the navigation bar
 */
const Appbar: VFC<Props> = ({}) => {
  const [isActive] = useSlider();

  // Lock the body scroll
  useEffect(() => {
    const bodyEl = document.querySelector('body');

    if (bodyEl) {
      bodyEl.style.overflowY = isActive ? 'hidden' : 'auto';
    }
  }, [isActive]);

  return (
    <header
      tw="col-span-full z-40 sticky top-0 bg-white"
      role="banner"
      css={css`
        will-change: transform;
      `}
    >
      <nav tw="grid grid-cols-12">
        <a tw="sr-only focus:not-sr-only" href="#skip">
          Skip to content
        </a>

        <Logo tw="col-start-1 col-span-2 xl:(col-start-2 col-span-1)" />

        <Burger tw="col-start-11 col-end-13 justify-self-center self-center xl:hidden" />

        <AnimatePresence>{isActive && <Slider />}</AnimatePresence>

        <MenuItemSet
          tw="hidden xl:(flex col-start-4 col-end-12 justify-end)"
          data={routes}
        />
      </nav>
    </header>
  );
};

export default Appbar;
