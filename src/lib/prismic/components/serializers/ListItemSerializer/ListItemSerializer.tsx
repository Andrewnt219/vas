import { ListItem } from '@prismic-types';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import tw, { css } from 'twin.macro';

type Props = { data: ListItem; className?: string; children: ReactNode };

function ListItemSerializer({ data, className, children }: Props) {
	switch (data.type) {
		case 'list-item':
			return <Bullet className={className}>{children}</Bullet>;

		case 'o-list-item':
			return <Number className={className}>{children}</Number>;

		default:
			return null;
	}
}

const sharedCss = css`
	${tw`pl-2 md:pl-3`}
`;

type BulletProps = {};
const Bullet = styled.li<BulletProps>`
	${sharedCss}
	list-style: disc;

	::marker {
		${tw`text-gray-200`}
	}
`;

type NumberProps = {};
const Number = styled.li<NumberProps>`
	${sharedCss}
	list-style: decimal;
`;

export default ListItemSerializer;
