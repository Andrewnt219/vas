import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import 'twin.macro';

type Props = {
	children: ReactNode;
	title?: string;
	customMeta?: { date: string; title: never } & Record<string, string>;
};

/**
 * @description renders the main layout with meta tags
 */
export default function MainLayout({
	children,
	customMeta,
	title = 'Andrew Nguyen – Web Developer, Writer.',
}: Props) {
	const router = useRouter();

	const meta = {
		description: 'Front-end developer. TypeScript, React, JAM Stack.',
		image: 'https://andrewnt.dev/images/banner.png',
		type: 'website',
		...customMeta,
	};

	return (
		<div tw="col-span-full">
			<Head>
				<title>{title}</title>
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
			<main id="skip">{children}</main>
		</div>
	);
}
