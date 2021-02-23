import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
	children: ReactNode;
	customMeta?: { date: string } & Record<string, string>;
};

export default function MainLayout({ children, customMeta }: Props) {
	const router = useRouter();

	const meta = {
		title: 'Andrew Nguyen – Web Developer, Writer.',
		description: 'Front-end developer. TypeScript, React, JAM Stack.',
		image: 'https://andrewnt.dev/images/banner.png',
		type: 'website',
		...customMeta,
	};

	return (
		<Container>
			<Head>
				<link rel="shortcut icon" href="/favicon.ico" />

				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#d73732" />
				<meta name="msapplication-TileColor" content="#d73732" />
				<meta name="theme-color" content="#d73732"></meta>
				<title>{meta.title}</title>
				<meta name="robots" content="follow, index" />
				<meta content={meta.description} name="description" />
				<meta
					property="og:url"
					content={`https://vasseneca.com${router.asPath}`}
				/>
				<meta property="og:type" content={meta.type} />
				<meta property="og:site_name" content="VAS Seneca" />
				<meta property="og:description" content={meta.description} />
				<meta property="og:title" content={meta.title} />
				<meta property="og:image" content={meta.image} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@andrewnt219" />
				<meta name="twitter:title" content={meta.title} />
				<meta name="twitter:description" content={meta.description} />
				<meta name="twitter:image" content={meta.image} />
				{meta.date && (
					<meta property="article:published_time" content={meta.date} />
				)}
			</Head>

			<Main id="skip">{children}</Main>
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.div<ContainerProps>`
	${tw`mx-auto`}
	${tw`prose`}
`;

type MainProps = {};
const Main = styled.main<MainProps>`
	${tw`flex flex-col justify-center  px-8`}
	${tw`transition-colors duration-500`}
	${tw`bg-white`} // necessary for a smooth transition with main
`;
