import { Response } from '@api-response';
import Image from '@components/LocalImage/LocalImage';
import SectionH1 from '@components/SectionH1/SectionH1';
import { PostDataService } from '@services/post-data-service';
import MainLayout from '@src/components/MainLayout/MainLayout';
import { PostModel } from '@src/models/PostModel';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';
import React, { VFC } from 'react';
import 'twin.macro';
type FactTileProps = {
	data: {
		key: string;
		value: string;
	};
};

// TODO ask Nhi about shadow
const FactTile: VFC<FactTileProps> = ({ data }) => {
	const { key, value } = data;
	return (
		<div tw="bg-white rounded-3xl shadow-lg relative pb-full">
			<div tw="position-center flex flex-col   items-center  font-medium leading-tight space-y-1 md:space-y-3">
				<span tw="text-primary text-4xl md:text-8xl">{value}</span>
				<span tw="text-base md:text-4xl">{key}</span>
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

/* -------------------------------------------------------------------------- */
/*                                    INDEX                                   */
/* -------------------------------------------------------------------------- */
type StaticProps = Response<PostModel>;

type Params = {};
export const getStaticProps: GetStaticProps<StaticProps, Params> = async () => {
	try {
		PostDataService.switchLanguage('vi-VN');
		const posts = await PostDataService.getPosts();

		if (!posts[0]) {
			return {
				props: {
					data: null,
					error: { message: 'Post not found', name: 'Sanity Error' },
				},
				revalidate: 1,
			};
		}

		return {
			props: { data: posts[0], error: null },
			revalidate: 1,
		};
	} catch (error) {
		console.log('getStaticProps:', error);

		return {
			props: { data: null, error: { message: 'Something went wrong' } },
			revalidate: 1,
		};
	}
};

type Props = InferGetStaticPropsType<typeof getStaticProps> & {};

const Index: VFC<Props> = ({ data, error }) => {
	const { t } = useTranslation();

	return (
		<MainLayout title="VAS">
			<section tw="grid grid-cols-12 content-start xl:-mt-24">
				<header tw="text-center grid-p-sm  xl:(col-start-2 col-end-6 self-center z-10 w-xl text-left)">
					<h1 tw="text-2xl text-primary font-bold md:text-4xl lg:text-5xl">
						{t('home:hero.title')}
					</h1>
					<p tw="mt-4 md:text-base lg:mt-6  xl:(mt-12 w-2/3)">
						{t('home:hero.subtitle')}
					</p>
				</header>

				<main tw="col-span-full mt-10 xl:(mt-0 col-start-6 col-end-13 relative top-24)">
					<Image
						src="friends-with-books.png"
						alt="A group of friends reading books"
						width={910}
						height={713}
						layout="responsive"
						sizes="50vw"
					/>
				</main>
			</section>

			<section tw="bg-gray-100 pt-10 md:pt-20 xl:pt-40">
				<header>
					<SectionH1>Our facts</SectionH1>
				</header>

				<main tw="grid grid-cols-12 space-y-10 md:space-y-24 xl:(space-y-0 mt-24)">
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
				</main>
			</section>
		</MainLayout>
	);
};

export default Index;
