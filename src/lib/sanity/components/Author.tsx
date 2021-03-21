import React, { ReactNode } from 'react';
import 'twin.macro';

type Props = { className?: string; children: ReactNode };

function Author({ className, children }: Props) {
	return (
		<figcaption
			className={className}
			tw="text-gray-200  uppercase text-base mt-3  md:(mt-6 text-2xl)"
		>
			{children}
		</figcaption>
	);
}

export default Author;
