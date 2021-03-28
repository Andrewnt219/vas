import { Result } from '@api-response';
import EnhancedImage from '@components/EnhancedImage/EnhancedImage';
import MemberInfoHover from '@components/MemberInfoHover/MemberInfoHover';
import PageBanner from '@components/PageBanner/PageBanner';
import SectionH1 from '@components/SectionH1/SectionH1';
import MainLayout from '@layouts/MainLayout';
import { AuthorModel } from '@lib/sanity/models/AuthorModel';
import { AuthorDataService } from '@services/author-data-service';
import { errorStatcPropsHandler } from '@src/server/utils/page-utils';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import NextLink from 'next/link';
import React, { VFC } from 'react';
import tw, { styled } from 'twin.macro';
/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */
type StaticProps = Result<AuthorModel[]>;
export const getStaticProps: GetStaticProps<StaticProps> = async () => {
	try {
		const authors = await AuthorDataService.getActiveAuthors();

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

const AboutUs: VFC<Props> = ({ data, error }) => {
	const { t } = useTranslation();

	const missions = [
		t`about-us:our-mission.one`,
		t`about-us:our-mission.two`,
		t`about-us:our-mission.three`,
		t`about-us:our-mission.four`,
	];

	if (error) {
		return <h1>{error.message}</h1>;
	}

	if (!data) {
		return <h1>Fetching members...</h1>;
	}

	return (
		<MainLayout title={t('about-us:title')} tw="pb-20 mt-0 md:pb-36">
			<PageBanner
				tw="mb-0! col-span-full"
				data={{
					imgAlt:
						'A cheerful group photo of Vietnamese students in an Orientation',
					imgLqip: require('images/hero/about-us.jpg?lqip'),
					imgSrc: require('images/hero/about-us.jpg'),
					title: t('about-us:title'),
				}}
			/>

			<Section tw="bg-gray-100 grid grid-cols-12">
				<div tw="grid-p-sm xl:grid-p-md">
					<header>
						<SectionH1>{t('about-us:about-us.title')}</SectionH1>

						<Trans
							i18nKey="about-us:about-us.subtitle"
							components={[<p key="p" tw="mb-8 xl:text-center" />]}
						/>
					</header>
				</div>
			</Section>

			<Section tw="grid grid-cols-12 relative">
				<div tw="grid-p-sm xl:(grid-p-md)">
					<header>
						<SectionH1>{t('about-us:our-mission.title')}</SectionH1>
					</header>

					<EnhancedImage
						src={require('images/friends-with-rocket.png')}
						lqip={require('images/friends-with-rocket.png?lqip')}
						alt="3 friends is preparing to launch a rocket"
						layout="responsive"
						width={2708}
						height={1804}
					/>

					<ul tw="mt-7 md:mt-14 space-y-8 xl:text-center">
						{missions.map((mission, index) => (
							<li key={index}>
								<p>{mission}</p>
							</li>
						))}
					</ul>
				</div>

				<div
					tw="absolute"
					css={`
						top: 35%;
						right: 0;
					`}
				>
					<EnhancedImage
						css={`
							width: 30rem;
						`}
						tw="hidden xl:(block col-span-1)"
						src={require('images/atom-outline.png')}
						lqip={require('images/atom-outline.png?lqip')}
						alt="An icon of an atom in red outline"
						layout="responsive"
						width={1510}
						height={1821}
					/>
				</div>

				<div
					tw="absolute"
					css={`
						left: 0;
						top: 20%;
					`}
				>
					<EnhancedImage
						css={`
							width: 35rem;
						`}
						tw="hidden xl:(block col-span-1)"
						src={require('images/global-outline.png')}
						lqip={require('images/global-outline.png?lqip')}
						alt="An icon of a globe in red outline "
						layout="responsive"
						width={1856}
						height={2768}
					/>
				</div>

				<div
					tw="absolute"
					css={`
						left: 0;
						top: -5%;
					`}
				>
					<EnhancedImage
						css={`
							width: 20rem;
						`}
						tw="hidden xl:(block col-span-1)"
						src={require('images/magnifier-outline.png')}
						lqip={require('images/magnifier-outline.png?lqip')}
						alt="An icon of magnifying glass in red outline"
						layout="responsive"
						width={931}
						height={1489}
					/>
				</div>

				<div
					tw="absolute"
					css={`
						right: 0;
						top: 10%;
					`}
				>
					<EnhancedImage
						css={`
							width: 30rem;
						`}
						tw="hidden xl:(block col-span-1)"
						src={require('images/mark-outline.png')}
						lqip={require('images/mark-outline.png?lqip')}
						alt="An icon of a marked place in red outline"
						layout="responsive"
						width={1510}
						height={2412}
					/>
				</div>

				<div
					tw="absolute"
					css={`
						right: 0;
						top: 50%;
					`}
				>
					<EnhancedImage
						css={`
							width: 20rem;
						`}
						tw="hidden xl:(block col-span-1)"
						src={require('images/pencil-outline.png')}
						lqip={require('images/pencil-outline.png?lqip')}
						alt="An icon of a pencil in red outline"
						layout="responsive"
						width={1131}
						height={1915}
					/>
				</div>

				<div
					tw="absolute"
					css={`
						left: 0;
						top: 45%;
					`}
				>
					<EnhancedImage
						css={`
							width: 35rem;
						`}
						tw="hidden xl:(block col-span-1)"
						src={require('images/ruler-outline.png')}
						lqip={require('images/ruler-outline.png?lqip')}
						alt="An icon of a ruler in red outline"
						layout="responsive"
						width={1992}
						height={2227}
					/>
				</div>

				<div
					tw="absolute"
					css={`
						right: 0;
						top: -10%;
					`}
				>
					<EnhancedImage
						css={`
							width: 35rem;
						`}
						tw="hidden xl:(block col-span-1)"
						src={require('images/torque-outline.png')}
						lqip={require('images/torque-outline.png?lqip')}
						alt="An icon of a torque in red outline"
						layout="responsive"
						width={1923}
						height={2481}
					/>
				</div>

				<div
					tw="absolute"
					css={`
						left: 5%;
						top: 20%;
					`}
				>
					<EnhancedImage
						css={`
							width: 25rem;
						`}
						tw="hidden xl:(block col-span-1)"
						src={require('images/triangle-outline.png')}
						lqip={require('images/triangle-outline.png?lqip')}
						alt="An icon of a triagle in red outline"
						layout="responsive"
						width={1638}
						height={1638}
					/>
				</div>
			</Section>

			<Section tw="mx-4 px-8 rounded-lg  bg-gradient-to-b from-gray-100 to-white  md:(rounded-4xl mx-10 px-16) xl:(rounded-4xl mx-14 px-32) ">
				<header>
					<SectionH1>{t('about-us:our-team.title')}</SectionH1>
				</header>

				<ul tw="grid gap-y-8 md:(grid-cols-3 gap-x-8 gap-y-16) 2xl:grid-cols-4">
					{data.map((member) => (
						<li key={member.slug}>
							<MemberInfoHover data={member} />
						</li>
					))}
				</ul>
			</Section>

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
	);
};

type SectionProps = {};
const Section = styled.section<SectionProps>(() => [
	tw`py-10 col-span-full   md:py-20 xl:py-32`,
]);

export default AboutUs;
