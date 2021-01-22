import { RouteValues } from '@src/data/routes-data';
import { useRouteMatch } from '@src/package/hooks/useRouteMatch';
import NextLink from 'next/link';
import {
	FocusEventHandler,
	KeyboardEventHandler,
	useRef,
	useState,
	VFC,
} from 'react';
import { css } from 'styled-components';
import tw, { styled } from 'twin.macro';
import { MenuDropdownItemSet } from '../../MenuItemSet';

type MenuItemProps = {
	data: RouteValues;
};

const MenuItem: VFC<MenuItemProps> = ({ data }) => {
	const { href, text, exact, children } = data;
	const isActive = useRouteMatch(href.toString(), exact);
	const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);

	const handleMouseEnter = () => {
		setIsVisibleDropdown(true);
	};

	const handleMouseLeave = () => {
		setIsVisibleDropdown(false);
	};

	const handleKeyDown: KeyboardEventHandler = (e) => {
		// stop bubbling up to the parent
		e.stopPropagation();

		if (e.key === 'Enter' && children !== undefined) {
			e.preventDefault();
			setIsVisibleDropdown((prev) => !prev);
		}
	};

	const blurTimerId = useRef<NodeJS.Timeout | null>(null);

	const handleBlur: FocusEventHandler = () => {
		blurTimerId.current = setTimeout(() => {
			if (isVisibleDropdown) {
				setIsVisibleDropdown(false);
			}
		}, 10);
	};

	const handleFocus: FocusEventHandler = () => {
		if (blurTimerId.current) {
			clearTimeout(blurTimerId.current);
			blurTimerId.current = null;
		}
	};

	return (
		<MenuItemContainer
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onKeyDown={handleKeyDown}
			onBlur={handleBlur}
			onFocus={handleFocus}
		>
			<NextLink href={href} passHref>
				<MenuItemLink
					aria-expanded={isVisibleDropdown}
					aria-haspopup={children !== undefined}
					isActive={isActive}
				>
					{text}
				</MenuItemLink>
			</NextLink>

			<DropdownContainer>
				{children && isVisibleDropdown && (
					<MenuDropdownItemSet data={children} />
				)}
			</DropdownContainer>
		</MenuItemContainer>
	);
};

type MenuItemContainerProps = {};
const MenuItemContainer = styled.div<MenuItemContainerProps>`
	${tw``}
`;

const activeLinkCss = css`
	${tw`text-red-400`}
`;
type MenuItemLinkProps = { isActive: boolean };
const MenuItemLink = styled.a<MenuItemLinkProps>`
	${tw``}

	${(p) => p.isActive && activeLinkCss}
`;

type DropdownContainerProps = {};
const DropdownContainer = styled.div<DropdownContainerProps>``;

export default MenuItem;
