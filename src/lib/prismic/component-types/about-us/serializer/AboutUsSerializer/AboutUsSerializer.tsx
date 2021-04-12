import { Elements, HTMLSerializer } from 'prismic-reactjs';
import { uid } from 'uid/single';
import AboutUsHyperlink from '../AboutUsHyperlink/AboutUsHyperlink';
import AboutUsImage from '../AboutUsImage/AboutUsImage';
import AboutUsList from '../AboutUsList/AboutUsList';

const getUniqueKey = () => uid(8);
export const AboutUsSerializer: HTMLSerializer<React.ReactNode> = (
	type,
	element,
	content,
	children,
	key
) => {
	switch (type) {
		case Elements.hyperlink:
			return (
				<AboutUsHyperlink data={element.data} key={getUniqueKey()}>
					{children}
				</AboutUsHyperlink>
			);

		case Elements.list:
		case Elements.oList:
			return (
				<AboutUsList data={element} key={getUniqueKey()}>
					{children}
				</AboutUsList>
			);

		case Elements.image:
			return <AboutUsImage data={element} key={getUniqueKey()} />;

		default:
			return null;
	}
};
