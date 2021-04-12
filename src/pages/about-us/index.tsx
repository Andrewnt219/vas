import { Result } from '@common';
import { MembersProvider } from '@contexts/MembersContext';
import MainLayout from '@layouts/MainLayout';
import { AboutUsDocument } from '@lib/prismic/component-types/about-us/AboutUsModel';
import AboutUsSliceZone from '@lib/prismic/component-types/about-us/slice/AboutUsSliceZone/AboutUsSliceZone';
import { MemberDocument } from '@lib/prismic/component-types/member/MemberModel';
import { PrismicService } from '@lib/prismic/prismic-service';
import { AuthorDataService } from '@services/author-data-service';
import {
	createStaticError,
	createStaticProps,
	errorStatcPropsHandler,
} from '@src/server/utils/page-utils';
import { tryParseLocale } from '@utils/validate-utils';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';
import NextLink from 'next/link';
import React, { VFC } from 'react';
import { css } from 'styled-components';
import tw from 'twin.macro';
/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */
type StaticProps = Result<{ members: MemberDocument[]; page: AboutUsDocument }>;
export const getStaticProps: GetStaticProps<StaticProps> = async ({
	locale,
}) => {
	try {
		const lang = tryParseLocale(locale);

		const authors = await AuthorDataService.getActiveAuthors(lang);
		const aboutUs = await PrismicService.getAboutUs(lang);

		if (!aboutUs) {
			return createStaticError('Page not found');
		}

		return createStaticProps({
			members: authors,
			page: aboutUs,
		});
	} catch (error) {
		return errorStatcPropsHandler(error);
	}
};

/* -------------------------------------------------------------------------- */
/*                                   CLIENT                                   */
/* -------------------------------------------------------------------------- */

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const AboutUs: VFC<Props> = ({ data, error }) => {
	const { t } = useTranslation();

	if (error) {
		return <h1>{error.message}</h1>;
	}

	if (!data) {
		return <h1>Fetching members...</h1>;
	}
	const { members, page } = data;

	return (
		<MembersProvider initialContext={members}>
			<MainLayout title="" tw="pb-20 mt-0 md:pb-36" css={mainLayoutCss}>
				{page.data.body.map((slice, index) => (
					<AboutUsSliceZone
						tw="col-span-full"
						sliceZone={slice}
						key={`slice-${index}`}
					/>
				))}

				<div tw="col-span-full mx-auto relative before:(content absolute w-full h-full top-2 -left-2 border-2 border-black)  ">
					<NextLink href="/about-us/members" passHref>
						<a tw="relative block z-10 border-2 border-black bg-white py-1 px-3 transition-colors hocus:(outline-none bg-primary text-white)  xl:(py-3 px-6 text-2xl)">
							{t('about-us:our-team.more-button')}{' '}
							<span tw="text-larger inline-block ml-6 md:ml-20 xl:ml-32">
								&gt;
							</span>
						</a>
					</NextLink>
				</div>
			</MainLayout>
		</MembersProvider>
	);
};

const mainLayoutCss = css`
	& > section:nth-child(even) {
		${tw`bg-gray-100`}
	}
`;

export default AboutUs;
