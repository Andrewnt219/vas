import { Result } from '@common';
import MemberInfoSet from '@components/MemberInfoSet/MemberInfoSet';
import { SizesProvider } from '@contexts/SizesContext';
import MainLayout from '@layouts/MainLayout';
import { MemberDocument } from '@lib/prismic/component-types/member/MemberModel';
import { AuthorDataService } from '@services/author-data-service';
import { errorStatcPropsHandler } from '@src/server/utils/page-utils';
import { pageTitle } from '@styles/_typographyStyles';
import { createResult } from '@utils/create-utils';
import { tryParseLocale } from '@utils/validate-utils';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */
type StaticProps = Result<MemberDocument[]>;
export const getStaticProps: GetStaticProps<StaticProps> = async ({
  locale,
}) => {
  try {
    const authors = await AuthorDataService.getAuthors(tryParseLocale(locale));

    return {
      props: createResult(authors),
      revalidate: 60,
    };
  } catch (error) {
    return errorStatcPropsHandler(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                                   CLIENT                                   */
/* -------------------------------------------------------------------------- */

type Props = InferGetStaticPropsType<typeof getStaticProps>;

function Members({ data, error }: Props) {
  const { t } = useTranslation();

  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (!data) {
    return <h1>Fetching members...</h1>;
  }

  // TODO change sizes
  return (
    <MainLayout title={t('members:title')} tw="mb-10 md:mb-20">
      <header tw="grid-p-sm ">
        <h1 css={pageTitle}>{t('members:title')}</h1>
      </header>

      <SizesProvider initialContext="100vw">
        <MemberInfoSet
          heading={t('members:current')}
          members={data.filter((doc) => doc.data.is_active)}
          tw="grid-p-sm "
        />

        <MemberInfoSet
          heading={t('members:former')}
          members={data.filter((doc) => !doc.data.is_active)}
          tw="grid-p-sm mt-8 md:mt-14 xl:mt-20"
        />
      </SizesProvider>
    </MainLayout>
  );
}
export default Members;
