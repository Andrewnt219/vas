import MainLayout from '@components/pages/MainLayout';
import CalendarIcon from '@icons/CalendarIcon';
import LocationIcon from '@icons/LocationIcon';
import PaperAirplaneIcon from '@icons/PaperAirplaneIcon';
import SchoolIcon from '@icons/SchoolIcon';
import { wrapper } from '@styles/spacing';
import { getCountdown } from '@utils/date-utils';
import { padZero } from '@utils/number-utils';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { HiCheckCircle, HiOutlineArrowNarrowDown } from 'react-icons/hi';
import tw from 'twin.macro';

const EVENT_DATE = new Date('2021-05-22T15:00:00Z');
function calculateDistance() {
  return EVENT_DATE.getTime() - new Date().getTime();
}
const button = tw` text-white background[#EA1D25] transition-all hover:(filter saturate-150) py-xs px-sm mt-md rounded md:(py-sm px-lg mt-2xl) xl:( py-md px-xl rounded-xl)`;
const sectionTitle = tw`
  font-black text-4xl mb-lg

  after:(
    content block mt-xs bg-primary h-1 w-12
  )

  md:(
    text-5xl after:(mt-md w-16)
  )

  xl:(
    after:(h-1.5)
  )
`;
const featuresSpacing = tw`space-y-sm md:space-y-md xl:space-y-lg`;
const sectionWrapper = tw`col-span-full my-md w-full`;
const infoIcon = tw`h-8 inline-block md:h-10 xl:h-16`;
type Props = { className?: string };

function Summer2021OrientationPage({ className }: Props) {
  const { t } = useTranslation();
  const [distance, setDistance] = useState<number>(calculateDistance);

  const { days, hours, minutes, seconds } = getCountdown(distance);

  useEffect(() => {
    const timerId = setInterval(() => setDistance(calculateDistance()), 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <MainLayout
      title="Summer 2021 Orientation"
      className={className}
      tw="pb-0! md:text-lg xl:(text-xl overflow-x-hidden)"
    >
      <header tw="col-span-full">
        <div tw="relative">
          <img
            src={require('images/orientation-hero.jpg')}
            // lqip={require('images/orientation-hero.jpg?lquip')}
            alt="Students attending Winter Orientation 2021"
            // layout="responsive"
            width={5237}
            height={3491}
          />

          <div tw="absolute-cover mix-blend-multiply background[ #D64B4B]" />
          <div tw="absolute-cover mix-blend-multiply background[radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0) 0%, #FED0D0 100%)]" />
          <div tw="absolute-cover mix-blend-multiply background[linear-gradient(180deg, #863737 0%, #fff 34.9%)]" />

          <div tw="absolute-cover text-white  text-sm flex flex-col text-center items-center justify-center md:text-base lg:text-2xl">
            <p>{t('summer-2021-orientation:hero.subtitle')}</p>

            <h1 tw="font-black text-2xl mt-xs md:(text-6xl mt-md) xl:text-8xl">
              <Trans
                i18nKey="summer-2021-orientation:hero.title"
                components={[<br key="br" />]}
              />
            </h1>

            <button css={button}>
              <a
                href="https://bit.ly/vas-orientation-s21-register-form"
                target="_blank"
                rel="noreferrer noopener"
              >
                {t('summer-2021-orientation:hero.button')}
              </a>
            </button>
          </div>

          <HiOutlineArrowNarrowDown tw="hidden  md:(block text-white text-4xl absolute bottom-md left-1/2 transform -translate-x-1/2 animate-pulse) xl:(text-6xl bottom-2xl)" />
        </div>
      </header>

      {/* Info */}
      <section
        css={[sectionWrapper]}
        tw="grid grid-cols-3 px-4 bg-skin-light mt-0! py-lg md:(px-8 py-2xl) xl:(px-2xl)"
      >
        <Info
          icon={<LocationIcon css={infoIcon} />}
          title={t('summer-2021-orientation:info.location.title')}
          description={
            <Trans
              i18nKey="summer-2021-orientation:info.location.description"
              components={[<br key="br" />]}
            />
          }
        />

        <Info
          tw="col-span-2"
          icon={<CalendarIcon css={infoIcon} />}
          title={t('summer-2021-orientation:info.calendar.title')}
          description={
            <Trans
              i18nKey="summer-2021-orientation:info.calendar.description"
              components={[<br key="br" />]}
            />
          }
        />
      </section>

      {/* About */}
      <section
        css={[wrapper.page, sectionWrapper]}
        tw="xl:(grid grid-cols-2 items-center)"
      >
        <div>
          <h2 css={sectionTitle}>{t('summer-2021-orientation:about.title')}</h2>

          <p tw="font-bold">
            <WithBreakline i18key="summer-2021-orientation:about.subtitle" />
          </p>

          <br />

          <p>{t('summer-2021-orientation:about.description')}</p>
        </div>

        <SchoolIcon tw="" />
      </section>

      {/* Features */}
      <section
        css={[wrapper.page, sectionWrapper, featuresSpacing]}
        tw="xl:( pl-24 py-24 relative left-20 before:(content block absolute top-0 left-0 h-full w-px bg-primary))"
      >
        <h2 css={sectionTitle}>
          {t('summer-2021-orientation:featuring.title')}
        </h2>

        <p>{t('summer-2021-orientation:featuring.description')}</p>

        <p>{t('summer-2021-orientation:featuring.timeline.title')}</p>

        <ul
          aria-label="List of activities during orientation"
          css={featuresSpacing}
        >
          {(
            t(
              'summer-2021-orientation:featuring.timeline.events',
              {},
              { returnObjects: true }
            ) as any[]
          ).map((item, index) => (
            <li key={index}>
              <p tw="font-bold flex text-primary items-center relative">
                <HiCheckCircle tw=" text-larger text-primary mr-xs xl:(absolute -left-24 transform -translate-x-1/2 m-0 bg-white )" />
                {item.title}
              </p>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Register */}
      <section
        css={[wrapper.page, sectionWrapper]}
        tw="md:(relative -mb-60 pt-52) "
      >
        <PaperAirplaneIcon tw="md:(absolute top-0 right-0 h-96) xl:(height[700px] transform -translate-y-1/3 translate-x-1/3)" />

        <div tw="md:(relative z-10 flex-center flex-col relative  text-center px-14 py-12 rounded-2xl  boxShadow[0px 19px 56px -8px rgba(0, 0, 0, 0.25)]) bg-white xl:(rounded-3xl py-20 px-24)">
          <h2 css={sectionTitle} tw="md:after:mx-auto">
            {t('summer-2021-orientation:register.title')}
          </h2>

          <div>
            <p tw="font-bold">
              {t('summer-2021-orientation:register.subtitle')}
            </p>

            <p tw="mt-xs">
              {t('summer-2021-orientation:register.description')}
            </p>
          </div>

          <div tw="mt-lg flex justify-evenly w-full max-w-xl md:mt-2xl">
            <CountDownBlock
              count={days}
              unit={t('summer-2021-orientation:register.day', { count: days })}
            />
            <CountDownBlock
              count={hours}
              unit={t('summer-2021-orientation:register.hour', {
                count: hours,
              })}
            />
            <CountDownBlock
              count={minutes}
              unit={t('summer-2021-orientation:register.minute', {
                count: minutes,
              })}
            />
            <CountDownBlock
              count={seconds}
              unit={t('summer-2021-orientation:register.second', {
                count: seconds,
              })}
            />
          </div>

          <button css={button} tw="mx-auto block">
            <a
              href="https://bit.ly/vas-orientation-s21-register-form"
              target="_blank"
              rel="noreferrer noopener"
            >
              {t('summer-2021-orientation:register.button')}
            </a>
          </button>
        </div>
      </section>

      <footer
        css={[sectionWrapper]}
        tw="mt-md mb-0! bg-skin-light py-md flex items-center justify-center md:pt-72"
      >
        <img
          tw="h-24"
          src={require('images/siv-logo.png')}
          alt="Logo of SIV with maple leaf and text Seneca International Vietnam"
        />
        <img
          src={require('images/logo.png')}
          alt="Logo of VAS with text Vietnaemse Association at Seneca College"
          tw="h-16"
        />
      </footer>
    </MainLayout>
  );
}

type InfoProps = {
  title: ReactNode;
  description: ReactNode;
  icon: ReactNode;
  className?: string;
};
function Info({ title, description, icon, className }: InfoProps) {
  return (
    <article
      tw="space-y-sm  md:first-of-type:(border-r borderColor[#BEBEBE]) md:last-of-type:(justify-self-center) xl:space-y-md"
      className={className}
    >
      {icon}
      <h2 tw="font-black">{title}</h2>
      <p>{description}</p>
    </article>
  );
}

type WithBreaklineProps = {
  i18key: string;
  components?: ReactElement[];
};
function WithBreakline({ i18key, components = [] }: WithBreaklineProps) {
  return (
    <Trans i18nKey={i18key} components={[<br key="br" />, ...components]} />
  );
}

type CountDownBlockProps = {
  count: number;
  unit: string;
};
function CountDownBlock({ count, unit }: CountDownBlockProps) {
  return (
    <div tw="flex flex-col items-center">
      <span tw="text-2xl font-bold md:text-7xl">{padZero(count)}</span>

      <span>{unit}</span>
    </div>
  );
}

export default Summer2021OrientationPage;
