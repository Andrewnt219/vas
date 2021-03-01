import { VFC } from 'react';
import 'twin.macro';

type Props = {
	data: {
		key: string;
		value: string;
	};
};

const FactTile: VFC<Props> = ({ data }) => {
	const { key, value } = data;
	return (
		<div tw="bg-white rounded-3xl relative pb-full shadow-card">
			<div tw="position-center flex flex-col   items-center  font-medium leading-tight space-y-1 md:space-y-3">
				<span tw="text-primary text-4xl md:text-8xl">{value}</span>
				<span tw="text-base md:text-4xl">{key}</span>
			</div>
		</div>
	);
};

export default FactTile;
