import { routes } from '@data/routes-data';
import { AnimateSharedLayout } from 'framer-motion';
import React from 'react';
import tw, { styled } from 'twin.macro';
import DropdownButton from '../DropDownButton/DropDownButton';
import DropDownItem from '../DropDownItem/DropDownItem';

type Props = { className?: string; data: typeof routes };

function DropDownItemSet({ className, data }: Props) {
	return (
		<AnimateSharedLayout>
			<DropDownContainer
				aria-label="sub navigation links"
				className={className}
			>
				{renderMenuItems(data)}
			</DropDownContainer>
		</AnimateSharedLayout>
	);
}

function renderMenuItems(items: typeof routes) {
	return items.map((item, index) => (
		<li key={index}>
			{item.type === 'route' ? (
				<DropDownItem data={item} />
			) : (
				<DropdownButton data={item} />
			)}
		</li>
	));
}

export const DropDownContainer = styled.ul`
	${tw`flex flex-col absolute left-5 bg-white rounded  py-4 shadow-card`}

	& > li {
		${tw`relative pl-6  pr-4 py-2`}
	}
`;

export default DropDownItemSet;
