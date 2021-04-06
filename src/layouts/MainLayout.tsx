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
