import Image from '@components/common/Image/Image';
import { Label } from '@components/common/Label/Label';
import Time from '@components/common/Time/Time';
import WithSeparator from '@components/common/WithSeparator/WithSeparator';
import { useSizes } from '@contexts/SizesContext';
import { Post } from '@src/server/services/post-service';
import { fonts } from '@styles/_typographyStyles';
import {
  getAuthorLink,
  getCategoryLink,
  getDataFromPost,
} from '@utils/convert-utils';
import { darkenImage } from '@utils/css-utils';
import useTranslation from 'next-translate/useTranslation';
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
        css={fonts.articleTitle}
        tw="block font-black underline decorator-transparent transition-colors hocus:(text-primary decorator-current)"
      >
        <h3>{title}</h3>
      </a>
    </NextLink>
  );
}

function MetaSubtitle({ post }: Props) {
  const { author, publishedDate, readingMinutes } = getDataFromPost(post);
  const { t } = useTranslation();

  return (
    <WithSeparator tw="text-smaller">
      {/* TODO add published date */}
      <span>
        By{' '}
        <NextLink href={getAuthorLink(author.uid)} passHref>
          <a tw="font-black text-primary transition-colors underline decorator-transparent hocus:(text-black decorator-current)">
            {author.data.title}
          </a>
        </NextLink>
      </span>

      <Time time={publishedDate} />

      <span>{t('common:reading-minute', { count: readingMinutes })}</span>
    </WithSeparator>
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
