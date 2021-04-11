import PageBanner from '@components/PageBanner/PageBanner';
import MainLayout from '@layouts/MainLayout';
import { CategoryDocument } from '@lib/prismic/component-types/category/CategoryModel';
import { Post } from '@services/post-service';
import React, { ReactElement } from 'react';
import 'twin.macro';

export type CategoryUIDPageProps = {
	className?: string;
	posts: Post[];
};
type Props = {
	className?: string;
	categoryDoc: CategoryDocument;
	children: ReactElement<CategoryUIDPageProps>;
};

// TODO change this to Page on Prismic, and PageBannerSlice
function CategoryUIDlayout({ className, categoryDoc, children }: Props) {
	return (
		<MainLayout title={categoryDoc.data.title} className={className} tw="">
			<PageBanner data={categoryDoc.data} />

			{children}
		</MainLayout>
	);
}

export default CategoryUIDlayout;
