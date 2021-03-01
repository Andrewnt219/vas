import MainLayout from '@components/MainLayout/MainLayout';
import PageBanner from '@components/PageBanner/PageBanner';
import React, { VFC } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {};

const events: VFC<Props> = ({}) => {
	return (
		<MainLayout title="Events">
			<PageBanner
				tw="grid-p-sm"
				data={{
					imgPath: 'hero/events.png',
					subtitle:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
					title: 'Events',
				}}
			/>
		</MainLayout>
	);
};

type ContainerProps = {};
const Container = styled.div<ContainerProps>`
	${tw``}
`;
export default events;
