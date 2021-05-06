import { Elements, HTMLSerializer } from 'prismic-reactjs';
import { uid } from 'uid/single';
import PostEmbed from '../PostEmbed/PostEmbed';
import PostHyperlink from '../PostHyperlink/PostHyperlink';
import PostImage from '../PostImage/PostImage';
import PostList from '../PostList/PostList';
import PostListItem from '../PostListItem/PostListItem';
import PostRichText from '../PostRichText/PostRichText';

const getUniqueKey = () => uid(8);
export const PostSerializer: HTMLSerializer<React.ReactNode> = (
  type,
  element,
  content,
  children,
  key
) => {
  switch (type) {
    case Elements.hyperlink:
      return (
        <PostHyperlink data={element.data} key={getUniqueKey()}>
          {children}
        </PostHyperlink>
      );

    case Elements.heading1:
    case Elements.heading2:
    case Elements.heading3:
    case Elements.heading4:
    case Elements.heading5:
    case Elements.heading6:
    case Elements.paragraph:
      return (
        <PostRichText data={element} key={getUniqueKey()}>
          {children}
        </PostRichText>
      );

    case Elements.list:
    case Elements.oList:
      return (
        <PostList data={element} key={getUniqueKey()}>
          {children}
        </PostList>
      );

    case Elements.oListItem:
    case Elements.listItem:
      return (
        <PostListItem data={element} key={getUniqueKey()}>
          {children}
        </PostListItem>
      );

    case Elements.image:
      return <PostImage data={element} key={getUniqueKey()} />;

    case Elements.embed:
      return <PostEmbed data={element} key={getUniqueKey()} />;

    default:
      return null;
  }
};
