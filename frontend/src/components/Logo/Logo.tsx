import Image from 'next/image';
import NextLink from 'next/link';
import React, { VFC } from 'react';

type Props = {
	className?: string;
};

const Logo: VFC<Props> = ({ className }) => {
	return (
		<NextLink href="/">
			<a className={className}>
				<Image
					src="/svg/logo.svg"
					width={125}
					height={73}
					layout="responsive"
				/>
			</a>
		</NextLink>
	);
};

export default Logo;
