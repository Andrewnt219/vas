import NewsCard from '@components/NewsCard/NewsCard';
import { Post } from '@services/post-service';
import useTranslation from 'next-translate/useTranslation';
import { VFC } from 'react';

type Props = {
  className?: string;
  posts: Post[];
};

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
    </section>
  );
};

export default NewsPage;
