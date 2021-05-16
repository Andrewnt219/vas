import { SizesProvider } from '@contexts/SizesContext';
import EmbedSerializer from '@lib/prismic/serializer/EmbedSerializer/EmbedSerializer';
import HyperlinkSerializer from '@lib/prismic/serializer/HyperlinkSerializer/HyperlinkSerializer';
import ImageSerializer from '@lib/prismic/serializer/ImageSerializer/ImageSerializer';
import ListItemSerializer from '@lib/prismic/serializer/ListItemSerializer/ListItemSerializer';
import ListSerializer from '@lib/prismic/serializer/ListSerializer/ListSerializer';
import RichTextSerializer from '@lib/prismic/serializer/RichTextSerializer/RichTextSerializer';
import { Elements, HTMLSerializer } from 'prismic-reactjs';
import { uid } from 'uid/single';

const getUniqueKey = () => uid(8);
export const serializer: HTMLSerializer<React.ReactNode> = (
  type,
  element,
  content,
  children,
  key
) => {
  switch (type) {
    case Elements.hyperlink:
      return (
        <HyperlinkSerializer data={element.data} key={getUniqueKey()}>
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
        <RichTextSerializer data={element} key={getUniqueKey()}>
          {children}
        </RichTextSerializer>
      );

    case Elements.list:
    case Elements.oList:
      return (
        <ListSerializer data={element} key={getUniqueKey()}>
          {children}
        </ListSerializer>
      );

    case Elements.oListItem:
    case Elements.listItem:
      return (
        <ListItemSerializer data={element} key={getUniqueKey()}>
          {children}
        </ListItemSerializer>
      );

    case Elements.image:
      return (
        <SizesProvider
          initialContext={'(min-width: 65ch) 130ch, 100vw'}
          key={getUniqueKey()}
        >
          <ImageSerializer data={element} />
        </SizesProvider>
      );

    case Elements.embed:
      return <EmbedSerializer data={element} key={getUniqueKey()} />;

    default:
      return null;
  }
};
