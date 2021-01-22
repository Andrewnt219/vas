import Document, {
	DocumentContext,
	Head,
	Html,
	Main,
	NextScript,
} from 'next/document';
import { ReactElement } from 'react';
import { ServerStyleSheet } from 'styled-components';

type GetInitialPropsReturn = {
	styles: ReactElement;
	html: string;
	head?: (ReactElement | null)[] | undefined;
};

export default class MyDocument extends Document {
	static async getInitialProps(
		ctx: DocumentContext
	): Promise<GetInitialPropsReturn> {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;
		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />),
				});
			const initialProps = await Document.getInitialProps(ctx);

			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}

	render(): ReactElement {
		return (
			<Html>
				<Head>
					<link
						rel="preload"
						href="/fonts/Inter/inter-v3-latin-regular.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>

					<script
						dangerouslySetInnerHTML={{
							__html: `							
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
									document.documentElement.classList.add('dark');																
                } else {
                  document.documentElement.classList.remove('dark')
                }                
              `,
						}}
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
