import EnhancedImage from '@components/EnhancedImage/EnhancedImage';
import PageH1 from '@components/PageH1/PageH1';
import SectionH1 from '@components/SectionH1/SectionH1';
import MainLayout from '@layouts/MainLayout';
import React, { VFC } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {};

const partners: VFC<Props> = ({}) => {
	return (
		<MainLayout title="Partners">
			<header tw="col-span-full">
				<PageH1 tw="text-center">Partnerships</PageH1>
			</header>

			<StyledSection>
				<header tw="text-center">
					<h1 tw="text-h3-variants">
						Why partner with <span tw="text-primary">VAS</span> ?
					</h1>

					<p tw="mt-4 md:(mt-10 ) xl:(w-1/2 mx-auto)">
						Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
						fugit, sed quia consequuntur magni dolores eos qui ratione
						voluptatem sequi nesciunt.
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
								<h2 tw="text-larger font-bold">Build</h2>
							</header>

							<p tw="mt-4">
								Build meaningful relationships with VAS and Seneca College
								students.
							</p>
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
								<h2 tw="text-larger font-bold">Expand</h2>
							</header>

							<p tw="mt-4">
								Expand our partner’s reach and brand presencethrough activations
								and product displays.
							</p>
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
								<h2 tw="text-larger font-bold">Innovate</h2>
							</header>

							<p tw="mt-4">
								Develop unique and innovative solutions for current business
								dilemmas through our numerous case competitions.
							</p>
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
								<h2 tw="text-larger font-bold">Spark</h2>
							</header>

							<p tw="mt-4">
								Spark the interest of the next generation of Seneca College
								innovators and develop their talents in order to succeed in
								their futures.
							</p>
						</article>
					</li>
				</ul>
			</StyledSection>

			<StyledSection tw="mt-24 md:mt-36">
				<SectionH1>Our partners</SectionH1>
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

export default partners;
