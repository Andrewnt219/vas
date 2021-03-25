import { useSlider } from '@components/Appbar/SliderContext';
import { Dropdown, Route } from '@data/routes-data';
import { useRouteMatch } from '@package/hooks/useRouteMatch/useRouteMatch';
import { AnimatePresence, motion, Transition, Variants } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import NextLink from 'next/link';
import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';

/* -------------------------------------------------------------------------- */
/*                                  RouteItem                                 */
/* -------------------------------------------------------------------------- */
type RouteItemProps = { className?: string; data: Route };

function RouteItem({ className, data }: RouteItemProps) {
	const { t } = useTranslation();
	const isMatched = useRouteMatch(data.href.toString(), data.exact);

	const [, setIsActive] = useSlider();
	const clickHandler = () => setIsActive(false);

	return (
		<div
			className={className}
			tw="transition-colors active:(bg-primary text-white)"
		>
			<NextLink href={data.href} passHref>
				<StyledLink isActive={isMatched} onClick={clickHandler}>
					{t(`common:navbar.${data.i18nKey}`, null, {
						fallback: 'common:fallback',
					})}
				</StyledLink>
			</NextLink>
		</div>
	);
}

type StyledLinkProps = {
	isActive: boolean;
};

const StyledLink = styled.a<StyledLinkProps>(({ isActive }) => [
	tw`font-medium block w-full text-left hocus:(outline-none ring ring-primary ring-offset-4)`,
	isActive && tw`text-primary`,
]);

/* -------------------------------------------------------------------------- */
/*                                DropDownItem                                */
/* -------------------------------------------------------------------------- */
type DropDownItemProps = { className?: string; data: Dropdown };

function DropDownItem({ className, data }: DropDownItemProps) {
	const { t } = useTranslation();
	const isMatched = useRouteMatch(data.href.toString(), data.exact);

	const [isVisibleDropdown, setIsVisibleDropdown] = useState<boolean>(false);

	const clickHandler = () => {
		setIsVisibleDropdown((prev) => !prev);
	};

	return (
		<div className={className}>
			<StyledLink
				aria-expanded={isVisibleDropdown}
				as="button"
				tw="font-medium"
				isActive={isMatched}
				onClick={clickHandler}
			>
				{t(`common:navbar.${data.i18nKey}`)}
			</StyledLink>
			<AnimatePresence>
				{isVisibleDropdown && (
					<motion.ul
						tw="pl-2"
						variants={parentVariants}
						animate="visible"
						initial="hidden"
						exit="hidden"
						transition={parentTransition}
					>
						{data.children.map((item) => (
							<motion.li
								variants={childVariants}
								transition={childTransition}
								key={item.href.toString()}
							>
								<SliderItem className={className} data={item} />
							</motion.li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	);
}

const parentTransition: Transition = {
	type: 'spring',
	stiffness: 50,
};

const parentVariants: Variants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const childTransition: Transition = {
	type: 'spring',
	stiffness: 50,
};

const childVariants: Variants = {
	hidden: {
		x: -10,
		opacity: 0,
	},
	visible: {
		x: 0,
		opacity: 1,
	},
};

/* -------------------------------------------------------------------------- */
/*                                 SliderItem                                 */
/* -------------------------------------------------------------------------- */
type Props = {
	className?: string;
	data: Dropdown | Route;
};

function SliderItem({ className, data }: Props) {
	if (data.type === 'dropdown')
		return <DropDownItem className={className} data={data} />;

	return <RouteItem className={className} data={data} />;
}

export default SliderItem;
