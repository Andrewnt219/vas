import React, { VFC } from 'react';
import tw, { css, styled } from 'twin.macro';

type Props = {
	isActive: ContainerProps['isActive'];
	handleClick(): void;
};

const Burger: VFC<Props> = ({ isActive, handleClick }) => {
	return (
		<Container
			aria-label="Toggle the menu"
			aria-expanded={isActive}
			//
			onClick={handleClick}
			isActive={isActive}
		>
			<Line />
			<Line />
			<Line />
		</Container>
	);
};

type LineProps = {};
const Line = styled.div<LineProps>`
	${tw`w-full h-1 rounded-full `}
	${tw`bg-black dark:bg-white `}
  ${tw`transition`}
  transform-origin: .3rem;
`;

const activeStateCss = css`
	${Line} {
		:nth-child(1) {
			${tw`transform rotate-45`}
		}

		:nth-child(2) {
			${tw`transform translate-x-5`}
			${tw`opacity-0`}
		}

		:nth-child(3) {
			${tw`transform -rotate-45`}
		}
	}
`;
css;
type ContainerProps = {
	isActive: boolean;
};
const Container = styled.button<ContainerProps>`
	${tw`flex flex-col w-8 space-y-1`}
	${tw`hocus:outline-none z-10`}

	:hover, :focus {
		${Line} {
			${tw`bg-blue-500`}
		}
	}

	${(p) => p.isActive && activeStateCss}

	${tw`md:(hidden)`}
`;

export default Burger;
