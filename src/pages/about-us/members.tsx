import MemberInfoSet from '@components/MemberInfoSet/MemberInfoSet';
import MainLayout from '@layouts/MainLayout';
import { MemberModel } from '@lib/sanity/models/MemberModel';
import React from 'react';
import 'twin.macro';
type Props = { className?: string };

function Members({ className }: Props) {
	return (
		<MainLayout title="Members" tw="mb-10 md:mb-20">
			<header tw="grid-p-sm ">
				<h1 tw="text-h1-variants font-bold text-primary mb-8 md:mb-20 xl:mb-32">
					VAS member
				</h1>
			</header>

			<MemberInfoSet
				heading="Current"
				members={[info, info, info, info, info, info, info]}
				tw="grid-p-sm "
			/>

			<MemberInfoSet
				heading="Former"
				members={[info, info, info]}
				tw="grid-p-sm mt-8 md:mt-14 xl:mt-20"
			/>
		</MainLayout>
	);
}

const info: MemberModel = {
	avatar: {
		url: require('images/avatar.jpg'),
		metadata: {
			lqip: require('images/avatar.jpg?lqip'),
			width: 100,
			height: 100,
			ratio: 1,
		},
		alt: 'A member avatar',
	},
	title: 'FirstName Middle LName',
	contact: {
		linkedIn: 'linkedin.com',
	},
	isActive: true,
	position: 'President',
};
export default Members;
