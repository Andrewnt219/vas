import NewsCard from '@components/NewsCard/NewsCard';
import Pagination from '@components/Pagination/Pagination';
import useTranslation from 'next-translate/useTranslation';
import { VFC } from 'react';
import { CategoryUIDPageProps } from './CategoryUIDlayout';

type Props = CategoryUIDPageProps;

const NewsPage: VFC<Props> = ({ posts }) => {
	const { t } = useTranslation();

	return (
		<section tw="grid-p-sm">
			<ul
				tw=" flex flex-col space-y-6 md:(space-y-12)"
				aria-label="articles about VAS' news"
			>
				{posts.map((post) => (
					<li key={post.id}>
						<NewsCard post={post} />
					</li>
				))}
			</ul>

			<Pagination
				total={posts.length}
				onItemClicked={(ev, page) => console.log(page)}
			/>
		</section>
	);
};

export default NewsPage;
