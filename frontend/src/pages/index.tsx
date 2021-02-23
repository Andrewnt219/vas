import Image from 'next/image';
import React, { VFC } from 'react';
import tw, { styled } from 'twin.macro';
type Props = {};

const index: VFC<Props> = ({}) => {
	return (
		<Container>
			<section>
				<Image
					src="/images/friends-with-books.png"
					alt="A group of friends reading books"
					width={910}
					height={713}
					layout="responsive"
				/>

				<h1 tw="text-5xl text-primary font-bold">
					Vietnamese Association at Seneca College
				</h1>
				<p>
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry.
				</p>
			</section>

			<section>
				<h1 tw="text-5xl border-b-2 border-primary pb-5 mx-auto max-w-max">
					Our facts
				</h1>

				<div tw="text-4xl flex flex-col">
					<span tw="text-8xl text-primary font-medium">08</span> members
				</div>
				<div tw="text-4xl flex flex-col">
					<span tw="text-8xl text-primary font-medium">30</span> projects
				</div>

				<Image
					src="/images/man-with-champion-cup.png"
					alt="A man holds a champion cup"
					width={336}
					height={696}
					layout="responsive"
				/>

				<Image
					src="/images/woman-with-pencil.png"
					alt="A woman holds a human-size pencil"
					width={251}
					height={582}
					layout="responsive"
				/>

				<Image
					src="/images/friends-with-hobbies.png"
					alt="A group of friends with different hobbies"
					width={831}
					height={568}
					layout="responsive"
				/>
			</section>
		</Container>
	);
};

type ContainerProps = {};
const Container = styled.div<ContainerProps>`
	${tw``}
`;
export default index;
