import React from 'react';
import 'twin.macro';

type Props = { className?: string };

function orientations({ className }: Props) {
	return (
		<div className={className} tw="">
			<h1>Orientation</h1>
		</div>
	);
}

export default orientations;
