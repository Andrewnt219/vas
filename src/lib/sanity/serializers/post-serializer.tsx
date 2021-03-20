import getYouTubeID from 'get-youtube-id';
import 'twin.macro';
import { BlockRenderer } from '../components/BlockRenderer';
import Breaker from '../components/Breaker';
import ExternalLink from '../components/ExternalLink';
import InternalLink from '../components/InternalLink';
import ListRenderer from '../components/ListRenderer';
import PostImage from '../components/PostImage';
import RenderedYoutube from '../components/RenderedYoutube';

export const postSerializer = {
	marks: {
		author: (props: any) => (
			<figcaption tw="text-gray-200 text-sm uppercase mt-5">
				{props.children}
			</figcaption>
		),
		// NOTE the structure of internalLink comes from post query in [slug]
		internalLink: ({ children, mark }: any) => (
			<InternalLink nextLinkProps={{ href: mark.url }}>{children}</InternalLink>
		),
		link: ({ children, mark }: any) => (
			<ExternalLink href={mark.href} blank>
				{children}
			</ExternalLink>
		),
	},
	list: ListRenderer,
	types: {
		youtube: ({ node }: { node: { url: string } }) => {
			const { url } = node;
			const id = getYouTubeID(url);
			return <RenderedYoutube youtubeVideoId={id ?? 'dQw4w9WgXcQ'} />;
		},
		image: PostImage,
		block: BlockRenderer,
		breaker: Breaker,
	},
};
