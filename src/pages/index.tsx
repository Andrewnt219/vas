import { Result } from "@common";
import PostCard from "@components/cards/PostCard/PostCard";
import CategoriesCard from "@components/pages/home/CategoriesCard/CategoriesCard";
import NewsletterCard from "@components/pages/home/NewsletterCard/NewsletterCard";
import SocialMediaBox from "@components/pages/home/SocialMediaCard/SocialMediaCard";
import MainLayout from "@components/pages/MainLayout";
import { SizesProvider } from "@contexts/SizesContext";
import { PrismicResult } from "@lib/prismic/prismic-service";
import {
  CategoryService,
  CategoryWithPosts,
} from "@src/server/services/category-data-service";
import { Post, PostService } from "@src/server/services/post-service";
import {
  createStaticProps,
  errorStatcPropsHandler,
} from "@src/server/utils/page-utils";
import { wrapper } from "@styles/spacing";
import { fonts } from "@styles/_typographyStyles";
import { getSizes } from "@utils/css-utils";
import { tryParseLocale } from "@utils/validate-utils";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState, VFC } from "react";
import { getCountdown } from "@utils/date-utils";
import tw from "twin.macro";
import { padZero } from "@utils/number-utils";

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
      orderings: "[document.first_publication_date desc]",
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
      title={t("home:hero.title")}
      tw="pb-0! mb-12 space-y-12 xl:space-y-32"
    >
      <Christmas2021LandingPage tw="pb-0! md:text-lg xl:(text-xl overflow-x-hidden)" />
      <ArticlesSection
        categoriesWithPosts={categoriesWithPosts}
        latestPosts={latestPosts}
      />

      {/* TODO load more, swr infinite */}
    </MainLayout>
  );
};

const EVENT_DATE = new Date("2021-12-25T15:00:00Z");
function calculateDistance() {
  return EVENT_DATE.getTime() - new Date().getTime();
}
const button = tw` text-black background[#FFFFFF] text-xs transition-all hover:(filter saturate-150) py-sm px-md mt-lg  rounded-lg  md:(py-sm px-lg mt-2xl text-sm) xl:( py-sm px-xl rounded-xl)`;

function Christmas2021LandingPage() {
  const { t } = useTranslation();
  const [distance, setDistance] = useState<number>(calculateDistance);

  const { days, hours, minutes, seconds } = getCountdown(distance);

  useEffect(() => {
    const timerId = setInterval(() => setDistance(calculateDistance()), 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <section css={"width: 100vw"}>
      <header tw="col-span-full">
        <div
          tw="relative"
          css={`
            @media only screen and (min-width: 1280px) {
              background-image: url("${require("images/Background.jpg")}");
              aspect-ratio: 1280 / 640;
            }

            background-image: url("${require("images/Background-mobile.jpg")}");
            aspect-ratio: 768 / 1280;

            background-repeat: no-repeat;
            background-size: 100% 100%;
            width: 100%;
          `}
        >
          <div tw="absolute-cover text-white flex flex-col text-center items-center justify-center font-sans">
            <div tw="color[#FFD13C] text-3xl font-bold md:(text-4xl)">
              <p tw="py-xs"> {t("Merry Christmas")}</p>
              <p tw="text-larger">{t("2021")}</p>
            </div>
            <div tw="mt-lg flex justify-evenly w-full max-w-xl md:mt-2xl">
              <CountDownBlock
                tw="text-black"
                count={days}
                unit={t("days", { count: days })}
              />
              <CountDownBlock
                count={hours}
                unit={t("hours", {
                  count: hours,
                })}
              />
              <CountDownBlock
                count={minutes}
                unit={t("minutes", {
                  count: minutes,
                })}
              />
              <CountDownBlock
                count={seconds}
                unit={t("seconds", {
                  count: seconds,
                })}
              />
            </div>

            <div>
              <p tw="color[rgba(255, 255, 255, 0.7)] font-thin text-xs mt-lg">
                {t("Christmas is coming!")}
                <br />
                {t("Let's join VAS's events to enjoy this holiday!")}
              </p>

              <button css={button}>
                <a href="/" target="_blank" rel="noreferrer noopener">
                  {t("Learn more")}
                </a>
              </button>
            </div>
          </div>
        </div>
      </header>
    </section>
  );
}

type CountDownBlockProps = {
  count: number;
  unit: string;
};
function CountDownBlock({ count, unit }: CountDownBlockProps) {
  return (
    <div tw="flex flex-col items-center background[rgba(255, 255, 255, 0.1)] w-1/5 rounded-lg p-6">
      <span tw="text-2xl font-bold md:text-6xl lg:text-6xl">
        {padZero(count)}
      </span>
      <span tw="text-sm">{unit}</span>
    </div>
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
  const { t } = useTranslation();

  return (
    <section
      css={wrapper.page}
      tw=" col-span-full grid grid-cols-1 xl:(grid-cols-3 gap-x-12 items-start)"
    >
      <header tw="col-span-full">
        {/* TODO translation */}
        <h1 css={fonts.sectionTitle}>{t("home:latest-articles.title")}</h1>
      </header>

      <ul
        aria-label="List of recent articles"
        tw="col-span-2 space-y-4 md:space-y-7 xl:space-y-12"
      >
        <SizesProvider initialContext={getSizes(["90vw", undefined, "1400px"])}>
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
