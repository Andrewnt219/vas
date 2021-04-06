import { List } from '@prismic-types';
import React, { ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
	data: List;
	children: ReactNode;
};

function ListSerializer({ data, children }: Props) {
	console.log(data.type);
	return (
		<StyledList as={data.type === 'group-o-list-item' ? 'ol' : 'ul'}>
			{children}
		</StyledList>
	);
}

type StyledListProps = {};
const StyledList = styled.ul<StyledListProps>`
	${tw`ml-8 my-6 space-y-3 md:(ml-11 my-10 space-y-6)`}
`;

export default ListSerializer;
