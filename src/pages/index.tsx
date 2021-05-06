import { Result } from '@common';
import Button from '@components/Button/Button';
import EnhancedImage from '@components/EnhancedImage/EnhancedImage';
import FontPrefetch from '@components/head/FontPrefetch';
import CategoriesBox from '@components/homepage/CategoriesBox/CategoriesBox';
import NewsletterBox from '@components/homepage/NewsletterBox/NewsletterBox';
import SocialMediaBox from '@components/homepage/SocialMediaBox/SocialMediaBox';
import Image from '@components/Image/Image';
import { Label } from '@components/Label/Label';
import { SectionH1 } from '@components/SectionH1/SectionH1';
import {
  CategoryService,
  CategoryWithPosts,
} from '@services/category-data-service';
import { Post, PostService } from '@services/post-service';
import MainLayout from '@src/layouts/MainLayout';
import {
  createStaticProps,
  errorStatcPropsHandler,
} from '@src/server/utils/page-utils';
import { wrapper } from '@styles/spacing';
import { articleTitle } from '@styles/_typographyStyles';
import {
  getAuthorLink,
  getCategoryLink,
  getDataFromPost,
  getPostLink,
} from '@utils/convert-utils';
import { darkenImage, getSizes } from '@utils/css-utils';
import { tryParseLocale } from '@utils/validate-utils';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import NextLink from 'next/link';
import { RichText } from 'prismic-reactjs';
import React, { VFC } from 'react';

// TODO use loadLocaleFrom in i18n.json to load translation files
// Maybe add some next.js api for fetching files from fire storage/firestore
/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */
type StaticProps = Result<{
  categoriesWithPosts: CategoryWithPosts[];
  latestPosts: Post[];
}>;

type Params = {};

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
  locale,
}) => {
  try {
    const lang = tryParseLocale(locale);

    const categoriesWithPosts = await CategoryService.getCategoriesWithPosts(
      lang
    );
    const latestPosts = await PostService.getPosts(lang, {
      pageSize: 10,
      orderings: '[document.first_publication_date desc]',
    });

    return createStaticProps({ categoriesWithPosts, latestPosts });
  } catch (error) {
    return errorStatcPropsHandler(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                                   CLIENT                                   */
/* -------------------------------------------------------------------------- */
type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: VFC<Props> = ({ data, error }) => {
  const { t } = useTranslation();

  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (!data) {
    return <h1>Loading...</h1>;
  }

  const { categoriesWithPosts, latestPosts } = data;

  return (
    <MainLayout
      title={t('home:hero.title')}
      tw="pb-0! mb-12 space-y-12 xl:space-y-32"
    >
      <Head>
        <FontPrefetch
          fonts={['300', '300italic', '700', '900', 'italic', 'regular']}
        />
      </Head>

      <section
        tw="col-span-full grid grid-cols-12 content-start xl:-mt-24"
        aria-labelledby="hero-title"
      >
        <header tw="text-center grid-p-sm  xl:(col-start-2 col-end-6 self-center z-10 w-larger text-left)">
          <h1
            id="hero-title"
            tw="text-2xl text-primary font-black md:text-4xl lg:text-5xl"
          >
            {t('home:hero.title')}
          </h1>

          <p tw="mt-sm md:text-base xl:(w-2/3)">{t('home:hero.subtitle')}</p>

          {/* TODO translate */}
          {/* TODO add primary button for read more (scroll down) */}
          {/* TODO switch find out more to secondary */}
          <NextLink href="/about-us" passHref>
            <Button as="a" variant="contain" size="lg" tw="mt-lg inline-block">
              Find out more
            </Button>
          </NextLink>
        </header>

        <div tw="col-span-full mt-10 xl:(mt-0 col-start-6 col-end-13 relative top-24)">
          <EnhancedImage
            src={require('images/friends-with-books.png')}
            lqip={require('images/friends-with-books.png?lqip')}
            alt="A group of friends reading books"
            width={2995}
            height={2331}
            layout="responsive"
            sizes="50vw"
          />
        </div>
      </section>

      <section
        css={wrapper}
        tw=" col-span-full grid grid-cols-1 xl:(grid-cols-3 gap-x-12 items-start)"
      >
        <header tw="col-span-full">
          {/* TODO translation */}
          <SectionH1>Latest articles</SectionH1>
        </header>

        <ul
          aria-label="List of recent articles"
          tw="col-span-2 space-y-4 md:space-y-7 xl:space-y-12"
        >
          {latestPosts.map((post) => (
            <li key={post.id}>
              <LatestArticle post={post} />
            </li>
          ))}
        </ul>

        <aside tw="mt-7 col-span-1 grid gap-y-4 md:(gap-7 grid-cols-2) xl:(mt-0 grid-cols-1 gap-12)">
          <NewsletterBox />
          <CategoriesBox categories={categoriesWithPosts} />
          <SocialMediaBox tw="col-span-full" />
        </aside>
      </section>

      {/* TODO load more, swr infinite */}
    </MainLayout>
  );
};

type LatestArticleProps = {
  post: Post;
  className?: string;
};

function LatestArticle({ post, className }: LatestArticleProps) {
  const { mainCategory, title, author, snippet, thumbnail } = getDataFromPost(
    post
  );
  const postLink = getPostLink(post.uid);

  return (
    <article>
      <NextLink href={postLink} passHref>
        <a tw="block relative pb-sm md:pb-xs" css={darkenImage}>
          <Image
            // Capped 1400px because of the max-width (take width of img at xl * 2)
            sizes={getSizes(['90vw', undefined, '1400px'])}
            tw="img-absolute absolute!"
            imgSrc={thumbnail.url}
            alt={thumbnail.alt}
          />
        </a>
      </NextLink>

      <header tw="mt-3 space-y-2 md:(mt-6 w-3/4 mx-auto) xl:mt-9">
        <NextLink href={getCategoryLink(mainCategory.uid)} passHref>
          <Label className={className} tw="">
            {mainCategory.data.title}
          </Label>
        </NextLink>

        <NextLink href={postLink} passHref>
          <a
            css={articleTitle}
            tw="block font-black underline decorator-transparent transition-colors hocus:(text-primary decorator-current)"
          >
            <h3>{title}</h3>
          </a>
        </NextLink>

        {/* TODO add published date */}
        <span tw="block text-smaller">
          By{' '}
          <NextLink href={getAuthorLink(author.uid)} passHref>
            <a tw="font-black text-primary transition-colors underline decorator-transparent hocus:(text-black decorator-current)">
              {author.data.title}
            </a>
          </NextLink>
        </span>
      </header>

      <div tw="mt-3 md:(w-3/4 mx-auto mt-6)">
        <RichText render={snippet} />
      </div>
    </article>
  );
}
export default Index;
