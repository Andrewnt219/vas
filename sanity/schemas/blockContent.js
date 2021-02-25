import { FaImage } from 'react-icons/fa';
import { internalLinkAnnotation } from '../customBlockContent/annotations/internalLinkAnnotation';
import { linkAnnotation } from '../customBlockContent/annotations/linkAnnotation';
import { authorDecorator } from '../customBlockContent/decorators/authorDecorator';
import { captionField } from '../fields/blockContent/caption';
import { altField } from '../fields/common/altField';
import breaker from './breaker';
import youtube from './youtube';
/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export default {
	title: 'Block Content',
	name: 'blockContent',
	type: 'array',
	of: [
		{
			title: 'Block',
			type: 'block',
			// Styles let you set what your user can mark up blocks with. These
			// correspond with HTML tags, but you can set any title or value
			// you want and decide how you want to deal with it where you want to
			// use your content.
			styles: [
				{ title: 'Normal', value: 'normal' },
				{ title: 'H2', value: 'h2' },
				{ title: 'H3', value: 'h3' },
				{ title: 'H4', value: 'h4' },
				{ title: 'Quote', value: 'blockquote' },
			],
			lists: [
				{ title: 'Bullet', value: 'bullet' },
				{ title: 'Number', value: 'number' },
			],
			// Marks let you mark up inline text in the block editor.
			marks: {
				// Decorators usually describe a single property – e.g. a typographic
				// preference or highlighting by editors.
				decorators: [
					{ title: 'Strong', value: 'strong' },
					{ title: 'Emphasis', value: 'em' },
					{ title: 'Underline', value: 'underline' },
					{ title: 'Strike', value: 'strike-through' },
					authorDecorator,
				],
				// Annotations can be any object structure – e.g. a link or a footnote.
				annotations: [internalLinkAnnotation, linkAnnotation],
			},
		},
		// You can add additional types here. Note that you can't use
		// primitive types such as 'string' and 'number' in the same array
		// as a block type.
		{
			type: 'image',
			icon: FaImage,
			options: {
				metadata: ['lqip'],
				hotspot: true,
			},
			fields: [altField, captionField],
		},
		{
			type: youtube.name,
		},
		{
			type: breaker.name,
		},
	],
};
