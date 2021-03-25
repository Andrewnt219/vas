import Footer from '@components/Footer/Footer';
import Logo from '@components/Logo/Logo';
import { routes } from '@data/routes-data';
import { motion, Transition, Variants } from 'framer-motion';
import React from 'react';
import { css } from 'twin.macro';
import SliderItem from './components/SliderItem/SliderItem';

type Props = { className?: string };

function Slider({ className }: Props) {
	return (
		<motion.div
			tw="fixed top-0 left-0 w-full h-full bg-white overflow-y-auto flex flex-col md:(text-2xl) "
			css={css`
				will-change: transform;
			`}
			variants={variants}
			animate="visible"
			initial="hidden"
			exit="hidden"
			transition={transition}
		>
			<div tw="sticky top-0 w-full bg-white">
				<Logo tw="w-1/3 mx-auto block" />
			</div>

			<ul className={className} tw="p-6 md:(p-10)">
				{routes.map((route) => (
					<li key={route.i18nKey}>
						<SliderItem tw="p-2 font-medium md:(p-5)" data={route} />
					</li>
				))}
			</ul>

			<Footer tw="sticky bottom-0 w-full flex-1" />
		</motion.div>
	);
}

const transition: Transition = {
	type: 'spring',
	stiffness: 50,
};
const variants: Variants = {
	hidden: {
		y: '-50%',
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
	},
};
export default Slider;
