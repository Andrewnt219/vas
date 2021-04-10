import PageBanner from '@components/PageBanner/PageBanner';
import MainLayout from '@layouts/MainLayout';
import { CategoryDocument } from '@lib/prismic/models/CategoryModel';
import React, { ReactNode } from 'react';
import 'twin.macro';

type Props = {
	className?: string;
	categoryDoc: CategoryDocument;
	children: ReactNode;
};

// TODO change this to Page on Prismic, and PageBannerSlice
function CategoryPageLayout({ className, categoryDoc, children }: Props) {
	return (
		<MainLayout title={categoryDoc.data.title} className={className} tw="">
			<PageBanner data={categoryDoc.data} />

			{children}
		</MainLayout>
	);
}

export default CategoryPageLayout;
