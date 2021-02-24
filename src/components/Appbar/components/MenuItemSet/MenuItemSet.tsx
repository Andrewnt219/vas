import { RouteValues } from '@src/data/routes-data';
import React, { VFC } from 'react';
import tw, { styled } from 'twin.macro';
import MenuItem from '../MenuItem/MenuItem';

type Props = {
	data: RouteValues[];
	className?: string;
};

const MenuItemSet: VFC<Props> = ({ data, className }) => {
	return (
		<Container className={className}>
			{data.map((route) => (
				<li key={route.href.toString()}>
					<MenuItem data={route} />
				</li>
			))}
		</Container>
	);
};

type ContainerProps = {};
const Container = styled.ul<ContainerProps>`
	${tw`space-x-10 flex`}

	li:last-of-type a {
		${tw`text-primary`}

		${tw`hocus:text-black`}
	}
`;
export default MenuItemSet;
