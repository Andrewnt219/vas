import { RichTextBlock } from 'prismic-reactjs';
import { ReactNode } from 'react';

type TextProps = {
	className?: string;
	data: RichTextBlock;
	children: ReactNode;
};

function TextSerializer({ className, data, children }: TextProps) {
	switch (data.type) {
		case 'heading2':
			return (
				<h2
					className={className}
					tw="font-bold text-2xl mt-10 mb-2 md:(text-4xl mb-8 mt-16)"
				>
					{children}
				</h2>
			);

		case 'heading3':
			return (
				<h3
					className={className}
					tw="font-bold mt-7 mb-2 text-larger md:(mt-14 mb-5 text-3xl)"
				>
					{children}
				</h3>
			);

		case 'heading4':
			return (
				<h4 className={className} tw="font-bold mt-7 mb-2 md:(mt-14 mb-3 )">
					{children}
				</h4>
			);

		case 'paragraph':
			return (
				<p className={className} tw="mb-7 md:mb-10">
					{children}
				</p>
			);

		default:
			return null;
	}
}

export default TextSerializer;
