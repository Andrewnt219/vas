import Image from 'next/image';
import NextLink from 'next/link';
import React, { VFC } from 'react';

type Props = {
	className?: string;
};

/**
 * @description renders the logo with link to homepage
 */
const Logo: VFC<Props> = ({ className }) => {
	return (
		<NextLink href="/" passHref>
			<a aria-label="Link to homepage" className={className}>
				<Image
					src="/svg/logo.svg"
					width={125}
					height={73}
					layout="responsive"
					alt="Logo with text VAS and Vietnamese Association at Seneca College"
				/>
			</a>
		</NextLink>
	);
};

export default Logo;
