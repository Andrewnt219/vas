import { Result } from '@common';
import PostCard from '@components/cards/PostCard/PostCard';
import Button from '@components/common/Button/Button';
import EnhancedImage from '@components/common/EnhancedImage/EnhancedImage';
import CategoriesCard from '@components/pages/home/CategoriesCard/CategoriesCard';
import NewsletterCard from '@components/pages/home/NewsletterCard/NewsletterCard';
import SocialMediaBox from '@components/pages/home/SocialMediaCard/SocialMediaCard';
import MainLayout from '@components/pages/MainLayout';
import { SizesProvider } from '@contexts/SizesContext';
import { PrismicResult } from '@lib/prismic/prismic-service';
import {
  CategoryService,
  CategoryWithPosts,
} from '@src/server/services/category-data-service';
import { Post, PostService } from '@src/server/services/post-service';
import {
  createStaticProps,
  errorStatcPropsHandler,
} from '@src/server/utils/page-utils';
import { wrapper } from '@styles/spacing';
import { fonts } from '@styles/_typographyStyles';
import { getSizes } from '@utils/css-utils';
import { tryParseLocale } from '@utils/validate-utils';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';
import NextLink from 'next/link';
import React, { VFC } from 'react';

// TODO use loadLocaleFrom in i18n.json to load translation files
// Maybe add some next.js api for fetching files from fire storage/firestore
/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */
type StaticProps = Result<{
  categoriesWithPosts: CategoryWithPosts[];
  latestPosts: PrismicResult<Post>;
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
      <HeroSection />

      <ArticlesSection
        categoriesWithPosts={categoriesWithPosts}
        latestPosts={latestPosts}
      />

      {/* TODO load more, swr infinite */}
    </MainLayout>
  );
};

function HeroSection() {
  const { t } = useTranslation();

  return (
    <section
      tw="col-span-full grid grid-cols-12 content-start xl:-mt-24"
      aria-labelledby="hero-title"
    >
      <header tw="text-center grid-p-sm  xl:(col-start-2 col-end-6 self-center z-10 width[150%] text-left)">
        <h1
          id="hero-title"
          tw="text-2xl text-primary font-black md:text-4xl lg:text-5xl"
        >
          {t('home:hero.title')}
        </h1>

        <p tw="mt-md md:text-base xl:(w-2/3)">{t('home:hero.subtitle')}</p>

        {/* TODO translate */}
        {/* TODO add primary button for read more (scroll down) */}
        {/* TODO switch find out more to secondary */}
        <NextLink href="/about-us" passHref>
          <Button as="a" variant="contain" size="lg" tw="mt-2xl inline-block">
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
  );
}

type ArticlesSectionProps = {
  latestPosts: PrismicResult<Post>;
  categoriesWithPosts: CategoryWithPosts[];
};
function ArticlesSection({
  latestPosts,
  categoriesWithPosts,
}: ArticlesSectionProps) {
  return (
    <section
      css={wrapper}
      tw=" col-span-full grid grid-cols-1 xl:(grid-cols-3 gap-x-12 items-start)"
    >
      <header tw="col-span-full">
        {/* TODO translation */}
        <h1 css={fonts.sectionTitle}>Latest articles</h1>
      </header>

      <ul
        aria-label="List of recent articles"
        tw="col-span-2 space-y-4 md:space-y-7 xl:space-y-12"
      >
        <SizesProvider initialContext={getSizes(['90vw', undefined, '1400px'])}>
          {latestPosts.results.map((post) => (
            <li key={post.id}>
              <PostCard.Article post={post} />
            </li>
          ))}
        </SizesProvider>
      </ul>

      <aside tw="mt-7 col-span-1 grid gap-y-4 md:(gap-7 grid-cols-2) xl:(mt-0 grid-cols-1 gap-12)">
        <NewsletterCard />
        <CategoriesCard categories={categoriesWithPosts} />
        <SocialMediaBox tw="col-span-full" />
      </aside>
    </section>
  );
}

export default Index;
