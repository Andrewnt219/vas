import { routes } from '@data/routes-data';
import { AnimateSharedLayout } from 'framer-motion';
import React from 'react';
import DropdownButton from '../DropDownButton/DropDownButton';
import DropDownItem from '../DropDownItem/DropDownItem';

type Props = { className?: string; data: typeof routes };

function DropDownItemSet({ className, data }: Props) {
	return (
		<AnimateSharedLayout>
			<ul
				aria-label="sub navigation links"
				className={className}
				tw="flex flex-col absolute left-5 bg-white  py-4 shadow-card"
			>
				{renderMenuItems(data)}
			</ul>
		</AnimateSharedLayout>
	);
}

function renderMenuItems(items: typeof routes) {
	return items.map((item, index) => (
		<li key={index} tw="relative pl-6  pr-4">
			{item.type === 'route' ? (
				<DropDownItem data={item} />
			) : (
				<DropdownButton data={item} />
			)}
		</li>
	));
}

export default DropDownItemSet;
