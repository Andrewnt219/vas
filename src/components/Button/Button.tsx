import tw, { css, styled } from 'twin.macro';

const base = css``;

const contain = css``;

const outline = css`
	${tw`block mx-auto border border-black rounded-2xl max-w-max px-6 py-1  transition-colors hocus:(outline-none text-white bg-primary border-primary) md:(py-2) xl:(text-2xl py-4)`}
`;

const link = css`
	${tw`underline decorator-transparent  hocus:(outline-none decorator-primary text-primary) transition-colors `}
`;

type ButtonProps = {
	variant?: 'outline' | 'contain' | 'link';
};

const Button = styled.button<ButtonProps>(({ variant }) => [
	base,
	variant === 'contain' && contain,
	variant === 'outline' && outline,
	variant === 'link' && link,
]);

export default Button;
