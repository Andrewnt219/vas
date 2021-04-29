import Button from '@components/Button/Button';
import EnhancedImage from '@components/EnhancedImage/EnhancedImage';
import FontPrefetch from '@components/head/FontPrefetch';
import CategoriesBox from '@components/homepage/CategoriesBox/CategoriesBox';
import NewsletterBox from '@components/homepage/NewsletterBox/NewsletterBox';
import SocialMediaBox from '@components/homepage/SocialMediaBox/SocialMediaBox';
import {
  CategoryService,
  CategoryWithPosts,
} from '@services/category-data-service';
import MainLayout from '@src/layouts/MainLayout';
import { container } from '@styles/shared-css';
import { tryParseLocale } from '@utils/validate-utils';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import NextLink from 'next/link';
import React, { VFC } from 'react';

// TODO use loadLocaleFrom in i18n.json to load translation files
// Maybe add some next.js api for fetching files from fire storage/firestore
/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */
type StaticProps = {
  categoriesWithPosts: CategoryWithPosts[];
};

type Params = {};

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
  locale,
}) => {
  const lang = tryParseLocale(locale);

  const categoriesWithPosts = await CategoryService.getCategoriesWithPosts(
    lang
  );

  return {
    props: {
      categoriesWithPosts,
    },

    revalidate: 60,
  };
};

/* -------------------------------------------------------------------------- */
/*                                   CLIENT                                   */
/* -------------------------------------------------------------------------- */
type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: VFC<Props> = ({ categoriesWithPosts }) => {
  const { t } = useTranslation();

  return (
    <MainLayout title={t('home:hero.title')} tw="pb-0! mb-12">
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
        css={container}
        tw="mt-96 col-span-full grid xl:(grid-cols-3 gap-x-12)"
      >
        <div tw="col-span-2">Posts</div>

        <aside tw="mt-7 col-span-1 grid gap-y-4 md:(gap-7 grid-cols-2) xl:(mt-0 grid-cols-1 gap-12)">
          <NewsletterBox />
          <CategoriesBox categories={categoriesWithPosts} />
          <SocialMediaBox tw="col-span-full" />
        </aside>
      </section>
    </MainLayout>
  );
};
export default Index;
