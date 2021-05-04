import tw, { css } from 'twin.macro';

export const lqipBackground = (lqip: string) => css`
  background-image: url(${lqip});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`;

// https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4#gistcomment-3036936
export function percentageToHex(percentage: number): string {
  const intValue = Math.round((percentage / 100) * 255); // map percent to nearest integer (0 - 255)
  const hexValue = intValue.toString(16); // get hexadecimal representation
  return hexValue.padStart(2, '0').toUpperCase(); // format with leading 0 and upper case characters
}

export function getSizes([base, md, xl, _2xl]: [
  string,
  string?,
  string?,
  string?
]): string {
  md ||= base;
  xl ||= md;
  _2xl ||= xl;

  return `(min-width: 1536px) ${_2xl}, (min-width: 1280px) ${xl}, (min-width: 768px) ${md}, ${base}`;
}

/* -------------------------------------------------------------------------- */

export const darkenImage = css`
  ${tw`relative`}

  ::after {
    ${tw`content absolute top-0 left-0 w-full h-full block bg-black opacity-0 transition-opacity`}
  }

  :hover ::after,
  :focus ::after {
    ${tw`opacity-10`}
  }
`;
