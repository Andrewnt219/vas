import tw, { css, styled } from 'twin.macro';

type InputLabelProps = {
	isRequired?: boolean;
};
export const InputLabel = styled.label<InputLabelProps>`
	${tw``}

	${(p) =>
		p.isRequired &&
		css`
			::after {
				content: '*';
				${tw`text-primary`}
			}
		`}
`;
