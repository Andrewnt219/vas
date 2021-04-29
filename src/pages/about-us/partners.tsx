import EnhancedImage from '@components/EnhancedImage/EnhancedImage';
import PageH1 from '@components/PageH1/PageH1';
import MainLayout from '@layouts/MainLayout';
import { sectionH1 } from '@styles/shared-css';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import React, { VFC } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {};

const Partners: VFC<Props> = ({}) => {
  const { t } = useTranslation();

  return (
    <MainLayout title={t('partnerships:title')}>
      <header tw="col-span-full">
        <PageH1 tw="text-center">{t('partnerships:title')}</PageH1>
      </header>

      <StyledSection>
        <header tw="text-center">
          <Trans
            i18nKey="partnerships:why.title"
            components={[
              <h1 key="h1" tw="text-h3-variants font-medium" />,
              <span key="span" tw="text-primary" />,
            ]}
          />

          <p tw="mt-4 md:(mt-10 ) xl:(w-1/2 mx-auto)">
            <Trans
              i18nKey="partnerships:why.subtitle"
              components={[<p key="p" tw="mb-8" />]}
            />
          </p>
        </header>

        <ul
          aria-label="Reasons to partner with VAS"
          tw="mt-10 grid gap-5 md:(grid-cols-2 mt-20)"
        >
          <li>
            <article tw="p-16 h-full shadow-card  text-center rounded-xl md:rounded-3xl">
              <EnhancedImage
                tw="w-24 mx-auto"
                src={require('images/build-icon.png')}
                lqip={require('images/build-icon.png?lqip')}
                width={310}
                height={310}
                layout="responsive"
                alt="Two black and red circles collide"
              />
              <header tw="mt-6">
                <h2 tw="text-larger font-bold">{t`partnerships:benefits.build.title`}</h2>
              </header>

              <p tw="mt-4">{t`partnerships:benefits.build.subtitle`}</p>
            </article>
          </li>

          <li>
            <article tw="p-16 h-full shadow-card  text-center rounded-xl md:rounded-3xl">
              <EnhancedImage
                tw="w-24 mx-auto"
                src={require('images/expand-icon.png')}
                lqip={require('images/expand-icon.png?lqip')}
                width={362}
                height={362}
                layout="responsive"
                alt="Two small black triagles inside a big red triagle"
              />
              <header tw="mt-6">
                <h2 tw="text-larger font-bold">{t`partnerships:benefits.expand.title`}</h2>
              </header>

              <p tw="mt-4">{t`partnerships:benefits.expand.subtitle`}</p>
            </article>
          </li>

          <li>
            <article tw="p-16 h-full shadow-card  text-center rounded-xl md:rounded-3xl">
              <EnhancedImage
                tw="w-24 mx-auto"
                src={require('images/innovate-icon.png')}
                lqip={require('images/innovate-icon.png?lqip')}
                width={441}
                height={441}
                layout="responsive"
                alt="Captain American's shield with an outter in red and inner in black"
              />
              <header tw="mt-6">
                <h2 tw="text-larger font-bold">{t`partnerships:benefits.innovate.title`}</h2>
              </header>

              <p tw="mt-4">{t`partnerships:benefits.innovate.subtitle`}</p>
            </article>
          </li>

          <li>
            <article tw="p-16 h-full shadow-card  text-center rounded-xl md:rounded-3xl">
              <EnhancedImage
                tw="w-24 mx-auto"
                src={require('images/spark-icon.png')}
                lqip={require('images/spark-icon.png?lqip')}
                width={386}
                height={382}
                layout="responsive"
                alt="a small black circle inside a red half-circle"
              />
              <header tw="mt-6">
                <h2 tw="text-larger font-bold">{t`partnerships:benefits.spark.title`}</h2>
              </header>

              <p tw="mt-4">{t`partnerships:benefits.spark.subtitle`}</p>
            </article>
          </li>
        </ul>
      </StyledSection>

      <StyledSection tw="mt-24 md:mt-36">
        <h1 css={sectionH1}>{t`partnerships:our-partners.title`}</h1>
        <ul
          aria-label="List of VAS' partners"
          tw="grid  md:grid-cols-2 xl:grid-cols-4"
        >
          <li>
            <EnhancedImage
              src={require('images/siv-logo.png')}
              lqip={require('images/siv-logo.png?lqip')}
              width={488}
              height={488}
              layout="responsive"
              alt="Logo of SIV with a maple leaf and text Seneca International Vietnam"
            />
          </li>
        </ul>
      </StyledSection>
    </MainLayout>
  );
};

const StyledSection = styled.section(() => [tw`grid-p-sm`]);

export default Partners;
