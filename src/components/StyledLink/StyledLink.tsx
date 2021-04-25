import tw, { css, styled, theme } from 'twin.macro';

const visitedCss = css`
	svg {
		color: ${theme`textColor.skin.muted`};
	}

	//NOTE Must be placed at the bottom because weird TS bug
	&:visited {
		// NOTE somehow text-skin-muted isn't working
		color: ${theme`textColor.skin.muted`};
		${tw`decorator-current`};
	}
`;

const hocusCss = css`
	&:hover,
	&:focus,
	&:visited:hover,
	&:visited:focus {
		${tw`text-primary`}
		${tw`svg:(transform text-primary scale-125)`}
	}
`;

const StyledLink = styled.a`
	${tw`underline transition-colors decorator-primary`}
	${tw`svg:(transition-all ease-linear text-primary ml-2 text-smaller)`}
	${tw`inline-flex items-center cursor-pointer`}
 
	${visitedCss}
	${hocusCss}
`;

export default StyledLink;
