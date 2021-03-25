import { useSlider } from '@components/Appbar/SliderContext';
import React, { VFC } from 'react';
import tw, { css, styled } from 'twin.macro';

type Props = {
	className?: string;
};

const Burger: VFC<Props> = ({ className }) => {
	const [isActive, setIsActive] = useSlider();

	const clickHandler = () => setIsActive((prev) => !prev);

	return (
		<Container
			aria-label="Toggle the menu"
			aria-expanded={isActive}
			//
			className={className}
			onClick={clickHandler}
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
	${tw`w-full h-1 rounded-full md:h-1.5`}
	${tw`bg-black `}
  ${tw`transition`}
  transform-origin: .3rem;
`;

const activeStateCss = css`
	${Line} {
		:nth-child(1) {
			${tw`transform rotate-45`}
		}

		:nth-child(2) {
			${tw`transform -translate-x-5`}
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
	${tw`flex flex-col w-8 space-y-1 md:(w-12 space-y-2)`}
	${tw`hocus:outline-none z-10`}
  ${tw`xl:hidden`}

	:hover, :focus {
		${Line} {
			${tw`bg-primary`}
		}
	}

	${(p) => p.isActive && activeStateCss}
`;

export default Burger;
