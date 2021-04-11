import { Result } from '@api-response';
import MemberInfoSet from '@components/MemberInfoSet/MemberInfoSet';
import PageH1 from '@components/PageH1/PageH1';
import MainLayout from '@layouts/MainLayout';
import { MemberDocument } from '@lib/prismic/component-types/member/MemberModel';
import { AuthorDataService } from '@services/author-data-service';
import { errorStatcPropsHandler } from '@src/server/utils/page-utils';
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
			props: {
				data: authors,
				error: null,
			},
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

	return (
		<MainLayout title={t('members:title')} tw="mb-10 md:mb-20">
			<header tw="grid-p-sm ">
				<PageH1>{t('members:title')}</PageH1>
			</header>

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
		</MainLayout>
	);
}
export default Members;
