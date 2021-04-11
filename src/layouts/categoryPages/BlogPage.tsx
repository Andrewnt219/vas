import { CategoryUIDPage } from '@common';
import NewsCard from '@components/NewsCard/NewsCard';
import Pagination from '@components/Pagination/Pagination';
import { VFC } from 'react';

type Props = CategoryUIDPage;

const BlogPage: VFC<Props> = ({ posts }) => {
	return (
		<section tw="grid-p-sm">
			<ul
				tw="flex flex-col space-y-6 md:(space-y-12)"
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

export default BlogPage;
