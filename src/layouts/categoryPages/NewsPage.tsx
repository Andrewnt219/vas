import NewsCard from '@components/NewsCard/NewsCard';
import Pagination from '@components/Pagination/Pagination';
import { CategoryDocument } from '@lib/prismic/models/CategoryModel';
import { Post } from '@model';
import useTranslation from 'next-translate/useTranslation';
import { VFC } from 'react';
import CategoryPageLayout from './CategoryPageLayout';

type Props = { categoryDoc: CategoryDocument; posts: Post[] };

const NewsPage: VFC<Props> = ({ categoryDoc, posts }) => {
	// FIXME
	// const { data, error } = usePostsWithMeta(PAGE_CATEGORY, initialData);
	const { t } = useTranslation();

	return (
		<CategoryPageLayout categoryDoc={categoryDoc}>
			{posts.length > 0 && (
				<>
					<ul
						tw="grid-p-sm flex flex-col space-y-6 md:(space-y-12)"
						aria-label="articles about VAS' news"
					>
						{posts.map((post) => (
							<li key={post.id}>
								<NewsCard post={post} />
							</li>
						))}
					</ul>

					<Pagination
						tw="col-span-full"
						total={posts.length}
						onItemClicked={(ev, page) => console.log(page)}
					/>
				</>
			)}
		</CategoryPageLayout>
	);
};

export default NewsPage;
