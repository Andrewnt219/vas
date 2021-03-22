import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
	title: string;
	customMeta?: { date: string; title: never } & Record<string, string>;
	className?: string;
};

/**
 * @description renders the main layout with meta tags
 */
export default function MainLayout({
	children,
	customMeta,
	title,
	className,
}: Props) {
	const { asPath } = useRouter();

	// TODO replace banner.png with vas
	const meta = {
		description: 'Vietnamese Association at Seneca College.',
		image: 'https://vasseneca.com/images/banner.png',
		type: 'website',
		...customMeta,
	};

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="robots" content="follow, index" />
				<meta content={meta.description} name="description" />
				<meta property="og:url" content={`https://vasseneca.com${asPath}`} />
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
			<main
				className={className}
				tw="col-span-full grid grid-cols-12 mt-6 pb-6 xl:(mt-20 pb-14)"
				id="skip"
			>
				{children}
			</main>
		</>
	);
}
