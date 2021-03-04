import React from 'react';
import 'twin.macro';

type Props = { className?: string };

function Tet({ className }: Props) {
	return (
		<div className={className} tw="">
			<h1>Tet</h1>
		</div>
	);
}

export default Tet;
