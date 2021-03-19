import EnhancedImage from '@components/EnhancedImage/EnhancedImage';
import MemberAvatar from '@components/MemberAvatar/MemberAvatar';
import PageBanner from '@components/PageBanner/PageBanner';
import SectionH1 from '@components/SectionH1/SectionH1';
import MainLayout from '@layouts/MainLayout';
import React, { VFC } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {};

const AboutUs: VFC<Props> = ({}) => {
	return (
		<MainLayout title="About us" tw="pb-20 mt-0 md:pb-36">
			<PageBanner
				tw="mb-0! col-span-full"
				data={{
					imgAlt:
						'A cheerful group photo of Vietnamese students in an Orientation',
					imgLqip: require('images/hero/about-us.jpg?lqip'),
					imgSrc: require('images/hero/about-us.jpg'),
					title: 'What is VAS ?',
				}}
			/>

			<Section tw="bg-gray-100 grid grid-cols-12">
				<div tw="grid-p-sm xl:grid-p-md">
					<header>
						<SectionH1>About us</SectionH1>
						<p tw="xl:text-center">
							Lorem Ipsum has been the industry&apos;s standard dummy text ever
							since the 1500s, when an unknown printer took a galley of type and
							scrambled it to make a type specimen book. It has survived not
							only five centuries, but also the leap into electronic
							typesetting, remaining essentially unchanged. It was popularised
							in the 1960s with the release of Letraset sheets containing Lorem
							Ipsum passages, and more recently with desktop publishing software
							like Aldus PageMaker including versions of Lorem Ipsum.
						</p>
					</header>
				</div>
			</Section>

			<Section tw="grid grid-cols-12 relative">
				<div tw="grid-p-sm xl:(grid-p-md)">
					<header>
						<SectionH1>Our mission</SectionH1>
					</header>

					<EnhancedImage
						src={require('images/friends-with-rocket.png')}
						lqip={require('images/friends-with-rocket.png?lqip')}
						alt="3 friends is preparing to launch a rocket"
						layout="responsive"
						width={2708}
						height={1804}
					/>

					<p tw="mt-7 md:mt-14 xl:text-center">
						Contrary to popular belief, Lorem Ipsum is not simply random text.
						It has roots in a piece of classical Latin literature from 45 BC,
						making it over 2000 years old. Richard McClintock, a Latin professor
						at Hampden-Sydney College in Virginia, looked up one of the more
						obscure Latin words, consectetur, from a Lorem Ipsum passage, and
						going through the cites of the word in classical literature,
						discovered the undoubtable source. Lorem Ipsum comes from sections
						1.10.32 and 1.10.33 of &quot;de Finibus Bonorum et Malorum&quot;
						(The Extremes of Good and Evil) by Cicero, written in 45 BC. This
						book is a treatise on the theory of ethics, very popular during the
						Renaissance. The first line of Lorem Ipsum, &quot;Lorem ipsum dolor
						sit amet..&quot;, comes from a line in section 1.10.32.
					</p>
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
					<SectionH1>Our team</SectionH1>
				</header>

				<ul tw="grid gap-y-8 md:(grid-cols-3 gap-x-8 gap-y-16)">
					<li>
						<MemberAvatar>
							<EnhancedImage
								tw="absolute-cover all:object-cover bg-no-repeat bg-cover bg-center"
								src={require('images/avatar.jpg')}
								lqip={require('images/avatar.jpg?lqip')}
								alt="An icon of a triagle in red outline"
								layout="fill"
							/>
						</MemberAvatar>
					</li>
					<li>
						<MemberAvatar>
							<EnhancedImage
								tw="absolute-cover all:object-cover bg-no-repeat bg-cover bg-center"
								src={require('images/avatar.jpg')}
								lqip={require('images/avatar.jpg?lqip')}
								alt="An icon of a triagle in red outline"
								layout="fill"
							/>
						</MemberAvatar>
					</li>
					<li>
						<MemberAvatar>
							<EnhancedImage
								tw="absolute-cover all:object-cover bg-no-repeat bg-cover bg-center"
								src={require('images/avatar.jpg')}
								lqip={require('images/avatar.jpg?lqip')}
								alt="An icon of a triagle in red outline"
								layout="fill"
							/>
						</MemberAvatar>
					</li>
					<li>
						<MemberAvatar>
							<EnhancedImage
								tw="absolute-cover all:object-cover bg-no-repeat bg-cover bg-center"
								src={require('images/avatar.jpg')}
								lqip={require('images/avatar.jpg?lqip')}
								alt="An icon of a triagle in red outline"
								layout="fill"
							/>
						</MemberAvatar>
					</li>
					<li>
						<MemberAvatar>
							<EnhancedImage
								tw="absolute-cover all:object-cover bg-no-repeat bg-cover bg-center"
								src={require('images/avatar.jpg')}
								lqip={require('images/avatar.jpg?lqip')}
								alt="An icon of a triagle in red outline"
								layout="fill"
							/>
						</MemberAvatar>
					</li>
					<li>
						<MemberAvatar>
							<EnhancedImage
								tw="absolute-cover all:object-cover bg-no-repeat bg-cover bg-center"
								src={require('images/avatar.jpg')}
								lqip={require('images/avatar.jpg?lqip')}
								alt="An icon of a triagle in red outline"
								layout="fill"
							/>
						</MemberAvatar>
					</li>
				</ul>
			</Section>

			<button tw="col-span-full mx-auto   py-1 px-3 border-2 border-black bg-white relative  before:(content -z-10 absolute w-full h-full top-1/4 -left-2 border-2 border-black) transition-colors hocus:(outline-none bg-primary text-white) xl:(py-3 px-6 text-2xl)">
				<span>And more...</span>
				<span tw="text-larger inline-block ml-8 md:ml-24 xl:ml-36">&gt;</span>
			</button>
		</MainLayout>
	);
};

type SectionProps = {};
const Section = styled.section<SectionProps>(() => [
	tw`py-10 col-span-full   md:py-20 xl:py-32`,
]);

export default AboutUs;
