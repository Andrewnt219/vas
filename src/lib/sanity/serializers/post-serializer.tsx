import Author from '../components/Author';
import { BlockRenderer } from '../components/BlockRenderer';
import Breaker from '../components/Breaker';
import ExternalLink from '../components/ExternalLink';
import InternalLink from '../components/InternalLink';
import ListRenderer from '../components/ListRenderer';
import PostImage from '../components/PostImage';
import RenderedYoutube from '../components/RenderedYoutube';

export const postSerializer = {
	marks: {
		author: Author,
		// NOTE the structure of internalLink comes from post query in [slug]
		internalLink: InternalLink,
		link: ExternalLink,
	},
	list: ListRenderer,
	types: {
		youtube: RenderedYoutube,
		image: PostImage,
		block: BlockRenderer,
		breaker: Breaker,
	},
};
