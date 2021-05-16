import usePagination, {
  UsePaginationItem,
  UsePaginationProps,
} from '@package/hooks/useMuiPagination';
import React, { ReactElement } from 'react';
import tw, { css, styled } from 'twin.macro';

type Props = {
  total: number;
  perPage?: number;
  usePaginationProps?: Omit<UsePaginationProps, 'count'>;
  onItemClicked?(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    currentPage: number
  ): void;
  className?: string;
};

function Pagination({
  className,
  onItemClicked,
  total,
  perPage = 1,
  usePaginationProps,
}: Props) {
  // passing in `items` doesn't work properly
  const { items } = usePagination({
    count: Math.ceil(total / perPage),
    ...usePaginationProps,
  });
  const Buttons = renderControllers(items, onItemClicked);
  const PrevButton = Buttons.shift();
  const NextButton = Buttons.pop();

  return (
    <nav
      aria-label="Page Pagination"
      className={className}
      tw="flex-center flex-col max-w-max mx-auto mt-10 md:mt-20"
    >
      <ul
        tw="width[150%] flex items-center justify-between"
        aria-label="arrow buttons"
      >
        {PrevButton}
        {NextButton}
      </ul>

      <ul
        tw="flex items-center space-x-2 mt-2 text-base md:(text-xl mt-5)"
        aria-label="page buttons"
      >
        {Buttons}
      </ul>
    </nav>
  );
}

// Render all the pagination controllers
function renderControllers(
  items: UsePaginationItem[],
  onClick: Props['onItemClicked']
): ReactElement[] {
  return items.map(({ page, type, onClick: onMuiClick, ...item }, index) => {
    let children = null;

    const handleItemClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      onMuiClick(event);
      onClick && onClick(event, page);
    };

    switch (type) {
      case 'start-ellipsis':
      case 'end-ellipsis':
        children = (
          <Button aria-hidden tabIndex={-1} isEllipsis {...item}>
            ...
          </Button>
        );
        break;

      case 'page':
        children = (
          <Button
            aria-label={
              item.selected
                ? `Current page, Page ${page}`
                : `Go to page ${page}`
            }
            onClick={handleItemClick}
            {...item}
          >
            {page}
          </Button>
        );
        break;

      case 'next':
        children = (
          <Control
            aria-disabled={item.disabled}
            onClick={handleItemClick}
            {...item}
          >
            <img src="/svg/right-arrow-icon.svg" alt="Go to next page" />
          </Control>
        );
        break;

      case 'previous':
        children = (
          <Control
            aria-disabled={item.disabled}
            disabled={item.disabled}
            onClick={handleItemClick}
          >
            <img src="/svg/left-arrow-icon.svg" alt="Go to previous page" />
          </Control>
        );
        break;

      default:
        children = (
          <Button onClick={handleItemClick} {...item}>
            {type}
          </Button>
        );
        break;
    }

    return (
      <li tw="list-none flex-center" key={index}>
        {children}
      </li>
    );
  });
}

// TODO fix focus/hover on mobile
type ButtonProps = {
  selected?: boolean;
  isEllipsis?: boolean;
};

const Control = styled.button<ButtonProps>`
  ${tw`outline-none w-10 h-10 rounded-full transition-all  p-3  hocus:(outline-none bg-gray-300 bg-opacity-10)  active:bg-opacity-20 disabled:(opacity-50 cursor-not-allowed) md:(w-12 h-12)`}
`;

const Button = styled.button<ButtonProps>`
  ${tw`transition-colors hocus:(outline-none text-primary  underline)`}

  ${(p) =>
    p.isEllipsis &&
    css`
      ${tw`bg-transparent pointer-events-none`}
    `}

	${(p) =>
    p.selected &&
    css`
      ${tw`font-bold text-primary`}
    `}
`;

export default Pagination;
