import React from 'react';
import 'twin.macro';

type Props = { className?: string };

function blog({ className }: Props) {
	return (
		<div className={className} tw="">
			Blog
		</div>
	);
}

export default blog;
