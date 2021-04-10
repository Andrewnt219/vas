import EnhancedImage from '@components/EnhancedImage/EnhancedImage';
import FactTile from '@components/FactTile/FactTile';
import SectionH1 from '@components/SectionH1/SectionH1';
import { AuthorDataService } from '@services/author-data-service';
import { StatsDataService } from '@services/stats-data-service';
import MainLayout from '@src/layouts/MainLayout';
import { ComponentProps } from '@utils';
import { padZero } from '@utils/number-utils';
import { tryParseLocale } from '@utils/validate-utils';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';
import React, { VFC } from 'react';

// TODO use loadLocaleFrom in i18n.json to load translation files
// Maybe add some next.js api for fetching files from fire storage/firestore
/* -------------------------------------------------------------------------- */
/*                                   SERVER                                   */
/* -------------------------------------------------------------------------- */
type StaticProps = { membersCount: number; projectsCount: number };

type Params = {};

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
	locale,
}) => {
	const projectsCount = await StatsDataService.countProjects();
	const membersCount = await AuthorDataService.countAuthors(
		tryParseLocale(locale)
	);

	return {
		props: {
			projectsCount,
			membersCount,
		},

		revalidate: 60,
	};
};

/* -------------------------------------------------------------------------- */
/*                                   CLIENT                                   */
/* -------------------------------------------------------------------------- */
type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Index: VFC<Props> = ({ membersCount, projectsCount }) => {
	const { t } = useTranslation();

	const FACTS: ComponentProps<typeof FactTile>['data'][] = [
		{
			key: t`home:our-facts.members.key`,
			value: padZero(membersCount),
		},
		{
			key: t`home:our-facts.projects.key`,
			value: padZero(projectsCount) + '+',
		},
	];

	return (
		<MainLayout title={t('home:hero.title')} tw="pb-0!">
			<section
				tw="col-span-full grid grid-cols-12 content-start xl:-mt-24"
				aria-labelledby="hero-title"
			>
				<header tw="text-center grid-p-sm  xl:(col-start-2 col-end-6 self-center z-10 w-xl text-left)">
					<h1
						id="hero-title"
						tw="text-2xl text-primary font-bold md:text-4xl lg:text-5xl"
					>
						{t('home:hero.title')}
					</h1>
					<p tw="mt-4 md:text-base lg:mt-6  xl:(mt-12 w-2/3)">
						{t('home:hero.subtitle')}
					</p>
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
				tw="col-span-full bg-gray-100 pt-10 md:pt-20 xl:pt-40"
				aria-labelledby="fact-title"
			>
				<header>
					<SectionH1 id="fact-title" tw="mb-0 xl:mb-24">
						{t`home:our-facts.title`}
					</SectionH1>
				</header>

				<div tw="grid grid-cols-12 space-y-10 md:space-y-24 xl:(space-y-0)">
					<EnhancedImage
						tw="hidden xl:(block col-start-1 col-end-3 relative -top-1/3)"
						src={require('images/woman-with-pencil.png')}
						lqip={require('images/woman-with-pencil.png?lqip')}
						alt="A woman holds a human-size pencil"
						width={928}
						height={2157}
						layout="responsive"
						sizes="15vw"
					/>

					<ul
						tw="grid grid-cols-2 gap-10 grid-p-sm xl:(grid-p-md gap-32)"
						aria-label="Facts about VAS"
					>
						{FACTS.map((fact) => (
							<li key={fact.key}>
								<FactTile data={fact} />
							</li>
						))}
					</ul>

					<EnhancedImage
						tw="hidden xl:(block col-start-10 col-end-13 w-full h-full) "
						src={require('images/man-with-champion-cup.png')}
						lqip={require('images/man-with-champion-cup.png?lqip')}
						alt="A man holds a champion cup"
						width={1297}
						height={2686}
						layout="responsive"
						sizes="25vw"
					/>

					<EnhancedImage
						tw="grid-p-sm relative z-10 top-3 md:top-6 lg:top-7 xl:(grid-p-md -mt-96!) 2xl:top-9"
						src={require('images/friends-with-hobbies.png')}
						lqip={require('images/friends-with-hobbies.png?lqip')}
						alt="A group of friends with different hobbies"
						width={3233}
						height={2210}
						layout="responsive"
						sizes="50vw"
					/>
				</div>
			</section>
		</MainLayout>
	);
};

export default Index;
