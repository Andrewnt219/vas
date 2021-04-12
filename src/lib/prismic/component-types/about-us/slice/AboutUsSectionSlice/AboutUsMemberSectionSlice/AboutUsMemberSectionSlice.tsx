import MemberInfoHover from '@components/MemberInfoHover/MemberInfoHover';
import SectionH1 from '@components/SectionH1/SectionH1';
import { useMembers } from '@contexts/MembersContext';
import { SizesProvider } from '@contexts/SizesContext';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import 'twin.macro';
import { AboutUsSectionSliceProps } from '..';

type Props = AboutUsSectionSliceProps;

function AboutUsMemberSectionSlice({ className, slice }: Props) {
	const members = useMembers();

	return (
		<section
			className={className}
			tw="mx-4 px-8 rounded-lg  bg-gradient-to-b from-gray-100 to-white  md:(rounded-4xl mx-10 px-16) xl:(rounded-4xl mx-14 px-32) "
		>
			<header>
				<SectionH1>{RichText.asText(slice.primary.title)}</SectionH1>
			</header>

			<SizesProvider initialContext="(min-width: 1536px) 20vw, (min-width: 768px) 15vw, 80vw">
				<ul tw="grid gap-y-8 md:(grid-cols-3 gap-x-8 gap-y-16) 2xl:grid-cols-4">
					{members.map((member) => (
						<li key={member.id}>
							<MemberInfoHover data={member.data} />
						</li>
					))}
				</ul>
			</SizesProvider>
		</section>
	);
}

export default AboutUsMemberSectionSlice;
