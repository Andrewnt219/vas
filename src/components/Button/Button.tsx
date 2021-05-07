import { percentageToHex } from '@utils/css-utils';
import tw, { css, styled, theme } from 'twin.macro';

const base = css`
  ${tw` font-black transition-colors`}

  :disabled {
    ${tw`bg-skin-dark text-white`}
  }
  /* ${tw`border border-transparent  max-w-max transition-colors `}
  ${tw`xl:text-2xl`}
	${tw`hocus:(outline-none)`} */
`;

const contain = css`
  ${tw`bg-primary  text-white px-6 py-2 border border-transparent `}
  box-shadow: 0 10px 15px 0 ${theme`colors.primary` + percentageToHex(20)};

  :hover,
  :focus {
    ${tw`bg-white  border-primary text-primary`}
  }

  :active {
    box-shadow: none;
  }

  /* ${tw`bg-primary text-white rounded  border-primary px-3 py-1`}
	${tw`md:(rounded-lg px-5 py-2) xl:( px-9 py-3 rounded-xl)`}
	${tw`hocus:( bg-white text-primary)`}
	${tw`active:(bg-primary text-white)`} */
`;

const outline = css`
  /* ${tw`border-black rounded-2xl px-6 py-1`}
	${tw`hocus:(outline-none text-white bg-primary border-primary)`}
	${tw`md:(py-2) xl:(text-2xl py-4)`}
	${tw`active:(bg-white text-primary)`} */
`;

const link = css`
  ${tw`underline decorator-transparent transition-colors `}
  ${tw`hocus:(outline-none decorator-primary text-primary)`}
`;

const lg = css`
  ${tw`px-8 py-3`}
`;

const sm = css`
  ${tw`px-2 py-1`}
`;

type ButtonProps = {
  variant?: 'outline' | 'contain' | 'link';
  size?: 'sm' | 'lg';
};

const Button = styled.button<ButtonProps>(({ variant, size }) => [
  base,
  variant === 'contain' && contain,
  variant === 'outline' && outline,
  variant === 'link' && link,
  size === 'sm' && sm,
  size === 'lg' && lg,
]);

export default Button;
