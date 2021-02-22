import MainLayout from '@src/components/MainLayout/MainLayout';
import { PostDataService } from '@src/services/post-data-service';
import React, { useEffect, VFC } from 'react';
import useSWR from 'swr';
import tw, { styled } from 'twin.macro';

const fetcher = (slug: string) => {
	return PostDataService.getPost(slug);
};

type Props = {};

const Homepage: VFC<Props> = () => {
	const { data, error } = useSWR(['foo-bar'], fetcher);

	useEffect(() => {
		PostDataService.increaseViews('7Gji71xun55JNyTx3dnS');
	}, []);

	return (
		<MainLayout>
			<div>
				<h2>Views: {data?.data.views ?? '...'}</h2>
			</div>
		</MainLayout>
	);
};

type ContainerProps = {};
const Container = styled.section<ContainerProps>`
	${tw``}
`;

export default Homepage;
