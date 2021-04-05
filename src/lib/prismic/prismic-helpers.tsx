import { Elements, HTMLSerializer } from 'prismic-reactjs';
import { uid } from 'uid/single';
import { Serializer } from './components/Serializers/Serializer';
/* -------------------------------------------------------------------------- */

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
				<Serializer.Hyperlink data={element.data} key={uid(8)}>
					{children}
				</Serializer.Hyperlink>
			);

		default:
			return null;
	}
};
