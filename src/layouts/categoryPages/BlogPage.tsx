import NewsCard from '@components/NewsCard/NewsCard';
import Pagination from '@components/Pagination/Pagination';
import { Post } from '@services/post-service';
import { VFC } from 'react';

type Props = {
  className?: string;
  posts: Post[];
};

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
