import MainLayout from '@src/components/MainLayout/MainLayout';
import { PostsSlugResponse } from 'api-response';
import axios, { AxiosError } from 'axios';
import React, { useEffect, VFC } from 'react';
import useSWR from 'swr';
import tw, { styled } from 'twin.macro';

const fetcher = (slug: string) => {
	return axios
		.get<PostsSlugResponse>(`/api/posts/${slug}`)
		.then((res) => res.data);
};

type Props = {};

const Homepage: VFC<Props> = () => {
	const { data, error } = useSWR<
		PostsSlugResponse,
		AxiosError<PostsSlugResponse>
	>(['foo-bar'], fetcher);

	if (error) {
		console.log('Error', error.response?.data.error?.message);
	}

	useEffect(() => {
		axios.patch<PostsSlugResponse>('/api/posts/increaseViews', {
			slug: 'foo-bar',
		});
	}, []);

	return (
		<MainLayout>
			<div>
				<h2>Views: {data?.data?.views ?? '...'}</h2>
			</div>
		</MainLayout>
	);
};

type ContainerProps = {};
const Container = styled.section<ContainerProps>`
	${tw``}
`;

export default Homepage;
