import Image from '@components/Image/Image';
import { Label } from '@components/Label/Label';
import Time from '@components/posts/Time/Time';
import { useSizes } from '@contexts/SizesContext';
import { Post } from '@services/post-service';
import { separator } from '@styles/apply';
import { articleTitle } from '@styles/_typographyStyles';
import {
  getAuthorLink,
  getCategoryLink,
  getDataFromPost,
} from '@utils/convert-utils';
import { darkenImage } from '@utils/css-utils';
import NextLink from 'next/link';
import { RichText } from 'prismic-reactjs';

type Props = { post: Post };

function CategoryLabel({ post }: Props) {
  const { mainCategory } = getDataFromPost(post);

  return (
    <NextLink href={getCategoryLink(mainCategory.uid)} passHref>
      <Label>{mainCategory.data.title}</Label>
    </NextLink>
  );
}

function Thumbnail({ post }: Props) {
  const { postLink, thumbnail } = getDataFromPost(post);
  const sizes = useSizes();

  return (
    <NextLink href={postLink} passHref>
      <a
        tw="block relative aspect-w-4 aspect-h-3 md:( aspect-w-16 aspect-h-9)"
        css={darkenImage}
      >
        <Image
          // Capped 1400px because of the max-width (take width of img at xl * 2)
          sizes={sizes}
          tw="img-absolute absolute!"
          imgSrc={thumbnail.url}
          alt={thumbnail.alt}
        />
      </a>
    </NextLink>
  );
}

function Title({ post }: Props) {
  const { postLink, title } = getDataFromPost(post);

  return (
    <NextLink href={postLink} passHref>
      <a
        css={articleTitle}
        tw="block font-black underline decorator-transparent transition-colors hocus:(text-primary decorator-current)"
      >
        <h3>{title}</h3>
      </a>
    </NextLink>
  );
}

function MetaSubtitle({ post }: Props) {
  const { author, publishedDate, readingMinutes } = getDataFromPost(post);

  return (
    <div tw="text-smaller flex items-center  space-x-1">
      {/* TODO add published date */}
      <span>
        By{' '}
        <NextLink href={getAuthorLink(author.uid)} passHref>
          <a tw="font-black text-primary transition-colors underline decorator-transparent hocus:(text-black decorator-current)">
            {author.data.title}
          </a>
        </NextLink>
      </span>

      <span css={separator} />

      <Time time={publishedDate} />

      <span css={separator} />

      {/* TODO translate */}
      <span>{readingMinutes} min read</span>
    </div>
  );
}

function Header({ post }: Props) {
  return (
    <header tw="mt-3 space-y-2 md:(mt-6 w-3/4 mx-auto) xl:mt-9">
      <CategoryLabel post={post} />

      <Title post={post} />

      <MetaSubtitle post={post} />
    </header>
  );
}

function Body({ post }: Props) {
  const { snippet } = getDataFromPost(post);

  return (
    <div tw="mt-3 md:(w-3/4 mx-auto mt-6)">
      <RichText render={snippet} />
    </div>
  );
}

function Article({ post }: Props) {
  return (
    <article>
      <Thumbnail post={post} />

      <Header post={post} />

      <Body post={post} />
    </article>
  );
}

const PostCard = {
  CategoryLabel,
  Thumbnail,
  Title,
  MetaSubtitle,
  Header,
  Body,
  Article,
};

export default PostCard;
