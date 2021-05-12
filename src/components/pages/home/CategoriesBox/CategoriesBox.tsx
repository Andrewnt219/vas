import WidgetBox from '@components/widgets/WidgetBox';
import { CategoryWithPosts } from '@src/server/services/category-data-service';
import { getCategoryLink } from '@utils/convert-utils';
import NextLink from 'next/link';
import React from 'react';
import { css } from 'twin.macro';

type Props = {
  className?: string;
  categories: CategoryLineProps['data'][];
};

function CategoriesBox({ className, categories }: Props) {
  categories = categories.sort(
    (a, b) => b.posts.results.length - a.posts.results.length
  );

  return (
    <WidgetBox
      title="Topics"
      className={className}
      tw="bg-skin-light overflow-hidden"
    >
      <ul tw="space-y-3" aria-label="List of featured hashtags">
        {categories.map((item, index) => (
          <li key={index} tw="">
            <CategoryLine data={item} />
          </li>
        ))}
      </ul>
    </WidgetBox>
  );
}

type CategoryLineProps = {
  data: CategoryWithPosts;
};
function CategoryLine({ data }: CategoryLineProps) {
  const { posts, ...category } = data;

  return (
    <p tw="flex ">
      <NextLink href={getCategoryLink(category.uid)} passHref>
        <a tw="pr-4 cursor-pointer hocus:text-primary">{category.data.title}</a>
      </NextLink>
      <span aria-hidden css={dots} tw="flex-1" />
      <span tw="pl-4 font-black">{posts.results.length}</span>
    </p>
  );
}

const dots = css`
  overflow: hidden;

  ::after {
    content: '. . . . . . . . . . . . . . . . . . . . '
      '. . . . . . . . . . . . . . . . . . . . '
      '. . . . . . . . . . . . . . . . . . . . ';

    white-space: nowrap;
  }
`;

export default CategoriesBox;
