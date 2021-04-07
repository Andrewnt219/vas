import { Elements, HTMLSerializer } from 'prismic-reactjs';
import { uid } from 'uid/single';
import HyperlinkSerializer from './components/serializers/HyperlinkSerializer/HyperlinkSerializer';
import ImageSerializer from './components/serializers/ImageSerializer/ImageSerializer';
import ListItemSerializer from './components/serializers/ListItemSerializer/ListItemSerializer';
import ListSerializer from './components/serializers/ListSerializer/ListSerializer';
import TextSerializer from './components/serializers/TextSerializer/TextSerializer';

export const htmlSerializer: HTMLSerializer<React.ReactNode> = (
	type,
	element,
	content,
	children,
	key
) => {
	switch (type) {
		case Elements.hyperlink:
			return (
				<HyperlinkSerializer data={element.data} key={uid(8)}>
					{children}
				</HyperlinkSerializer>
			);

		case Elements.heading1:
		case Elements.heading2:
		case Elements.heading3:
		case Elements.heading4:
		case Elements.heading5:
		case Elements.heading6:
		case Elements.paragraph:
			return (
				<TextSerializer data={element} key={uid(8)}>
					{children}
				</TextSerializer>
			);

		case Elements.list:
		case Elements.oList:
			return (
				<ListSerializer data={element} key={uid(8)}>
					{children}
				</ListSerializer>
			);

		case Elements.oListItem:
		case Elements.listItem:
			return (
				<ListItemSerializer data={element} key={uid(8)}>
					{children}
				</ListItemSerializer>
			);

		case Elements.image:
			return <ImageSerializer data={element} key={uid(8)} />;
		default:
			return null;
	}
};
