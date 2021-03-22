import React from 'react';

type Props = { className?: string };

function LoadingIndicator({ className }: Props) {
	return (
		<div className={className} tw="">
			Loading
		</div>
	);
}

export default LoadingIndicator;
