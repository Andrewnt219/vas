import MainLayout from '@src/components/MainLayout/MainLayout';
import Link from 'next/link';
import React, { VFC } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {};

const Homepage: VFC<Props> = ({}) => {
	return (
		<MainLayout>
			<div>
				<h1>Hey, I’m Lee Robinson</h1>
				<h2>
					I’m a developer, writer, and creator. I work at ▲Vercel as a Solutions
					Architect. You’ve found my personal slice of the internet –&nbsp;
					<Link href="/guestbook">
						<a>sign my guestbook&nbsp;</a>
					</Link>
					while you&apos;re here.
				</h2>
				<h3>Most Popular</h3>

				<h3>Projects</h3>
			</div>
		</MainLayout>
	);
};

type ContainerProps = {};
const Container = styled.section<ContainerProps>`
	${tw``}
`;

export default Homepage;
