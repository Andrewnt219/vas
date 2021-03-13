import tw, { css, styled } from 'twin.macro';

const base = css`
	${tw`border border-transparent  max-w-max transition-colors `}
	${tw`xl:text-2xl`}
	${tw`hocus:(outline-none)`}
`;

const contain = css`
	${tw`bg-primary text-white rounded  border-primary px-3 py-1`}
	${tw`md:(rounded-lg px-5 py-2) xl:( px-9 py-3 rounded-xl)`}
	${tw`hocus:( bg-white text-primary)`}
	${tw`active:(bg-primary text-white)`}
`;

const outline = css`
	${tw`border-black rounded-2xl px-6 py-1`}
	${tw`hocus:(outline-none text-white bg-primary border-primary)`}
	${tw`md:(py-2) xl:(text-2xl py-4)`}
	${tw`active:(bg-white text-primary)`}
`;

const link = css`
	${tw`underline decorator-transparent transition-colors `}
	${tw`hocus:(outline-none decorator-primary text-primary)`}
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
