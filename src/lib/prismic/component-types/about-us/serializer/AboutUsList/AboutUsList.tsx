import { List } from '@prismic-types';
import React, { ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
	data: List;
	children: ReactNode;
};

function AboutUsList({ data, children }: Props) {
	return (
		<StyledList as={data.type === 'group-o-list-item' ? 'ol' : 'ul'}>
			{children}
		</StyledList>
	);
}

type StyledListProps = {};
const StyledList = styled.ul<StyledListProps>`
	${tw`space-y-8 xl:text-center`}
`;

export default AboutUsList;
