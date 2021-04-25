import { List } from '@prismic-types';
import React, { ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
	data: List;
	children: ReactNode;
};

function PostList({ data, children }: Props) {
	return (
		<StyledList as={data.type === 'group-o-list-item' ? 'ol' : 'ul'}>
			{children}
		</StyledList>
	);
}

type StyledListProps = {};
const StyledList = styled.ul<StyledListProps>`
	${tw`mb-4 pl-6 space-y-1`}
`;

export default PostList;
