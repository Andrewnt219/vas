import FactTile from '@components/FactTile/FactTile';
import Image from '@components/LocalImage/LocalImage';
import SectionH1 from '@components/SectionH1/SectionH1';
import MainLayout from '@src/components/MainLayout/MainLayout';
import { ComponentProps } from '@utils';
import useTranslation from 'next-translate/useTranslation';
import React, { VFC } from 'react';
import 'twin.macro';

const FACTS: ComponentProps<typeof FactTile>['data'][] = [
	{
		key: 'members',
		value: '08',
	},
	{
		key: 'projects',
		value: '30',
	},
];

type Props = {};

const Index: VFC<Props> = () => {
	const { t } = useTranslation();

	return (
		<MainLayout title="VAS">
			<section tw="grid grid-cols-12 content-start xl:-mt-24" title="hero">
				<header tw="text-center grid-p-sm  xl:(col-start-2 col-end-6 self-center z-10 w-xl text-left)">
					<h1 tw="text-2xl text-primary font-bold md:text-4xl lg:text-5xl">
						{t('home:hero.title')}
					</h1>
					<p tw="mt-4 md:text-base lg:mt-6  xl:(mt-12 w-2/3)">
						{t('home:hero.subtitle')}
					</p>
				</header>

				<div tw="col-span-full mt-10 xl:(mt-0 col-start-6 col-end-13 relative top-24)">
					<Image
						src="friends-with-books.png"
						alt="A group of friends reading books"
						width={910}
						height={713}
						layout="responsive"
						sizes="50vw"
					/>
				</div>
			</section>

			<section tw="bg-gray-100 pt-10 md:pt-20 xl:pt-40" title="Our facts">
				<header>
					<SectionH1>Our facts</SectionH1>
				</header>

				<div tw="grid grid-cols-12 space-y-10 md:space-y-24 xl:(space-y-0 mt-24)">
					<Image
						tw="hidden xl:(block col-start-1 col-end-3 relative -top-1/3)"
						src="woman-with-pencil.png"
						alt="A woman holds a human-size pencil"
						width={251}
						height={582}
						layout="responsive"
						sizes="15vw"
					/>

					<ul tw="grid grid-cols-2 gap-10 grid-p-sm xl:(grid-p-md gap-32)">
						{FACTS.map((fact) => (
							<li key={fact.key}>
								<FactTile data={fact} />
							</li>
						))}
					</ul>

					<Image
						tw="hidden xl:(block col-start-10 col-end-13 w-full h-full) "
						src="man-with-champion-cup.png"
						alt="A man holds a champion cup"
						width={336}
						height={696}
						layout="responsive"
						sizes="25vw"
					/>

					<Image
						tw="grid-p-sm relative z-10 top-3 md:top-6 lg:top-7 xl:(grid-p-md -mt-96!)"
						src="friends-with-hobbies.png"
						alt="A group of friends with different hobbies"
						width={831}
						height={568}
						layout="responsive"
						sizes="50vw"
					/>
				</div>
			</section>
		</MainLayout>
	);
};

export default Index;
