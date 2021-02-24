import SectionH1 from '@components/SectionH1/SectionH1';
import MainLayout from '@src/components/MainLayout/MainLayout';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import React, { VFC } from 'react';
import 'twin.macro';
type FactTileProps = {
	data: {
		key: string;
		value: string;
	};
};

const FactTile: VFC<FactTileProps> = ({ data }) => {
	const { key, value } = data;
	return (
		<div tw="bg-white rounded-3xl shadow-lg relative pb-full">
			<div tw="position-center flex flex-col   items-center space-y-5 font-medium leading-tight">
				<span tw="text-primary text-8xl ">{value}</span>
				<span tw="text-4xl ">{key}</span>
			</div>
		</div>
	);
};

const FACTS: FactTileProps['data'][] = [
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

const Index: VFC<Props> = ({}) => {
	const { t } = useTranslation();

	return (
		<MainLayout title="VAS">
			<section tw="grid grid-cols-12 ">
				<header
					tw="col-start-2 col-end-6 self-center z-10"
					style={{ width: '125%' }}
				>
					<h1 tw="text-5xl text-primary font-bold ">{t('home:hero.title')}</h1>
					<p tw="mt-10 w-2/3 text-body">{t('home:hero.subtitle')}</p>
				</header>

				<div tw="col-start-6 col-end-13 relative top-20">
					<Image
						src="/images/friends-with-books.png"
						alt="A group of friends reading books"
						width={910}
						height={713}
						layout="responsive"
						sizes="50vw"
						loading="eager"
					/>
				</div>
			</section>

			<section tw="bg-gray-100 pt-40">
				<header>
					<SectionH1>Our facts</SectionH1>
				</header>

				<main tw="grid grid-cols-12 mt-28">
					<div tw="col-start-1 col-end-3 relative -top-1/3 ">
						<Image
							src="/images/woman-with-pencil.png"
							alt="A woman holds a human-size pencil"
							width={251}
							height={582}
							layout="responsive"
							sizes="15vw"
						/>
					</div>

					<ul tw="grid grid-cols-2 gap-32 col-start-4 col-end-10 ">
						{FACTS.map((fact) => (
							<li key={fact.key}>
								<FactTile data={fact} />
							</li>
						))}
					</ul>

					<div tw="col-start-10 col-end-13 ">
						<Image
							src="/images/man-with-champion-cup.png"
							alt="A man holds a champion cup"
							width={336}
							height={696}
							layout="responsive"
							sizes="25vw"
						/>
					</div>

					<div tw="col-start-4 col-end-10 -mt-96 z-10 relative top-7">
						<Image
							src="/images/friends-with-hobbies.png"
							alt="A group of friends with different hobbies"
							width={831}
							height={568}
							layout="responsive"
							sizes="50vw"
						/>
					</div>
				</main>
			</section>
		</MainLayout>
	);
};

export default Index;
