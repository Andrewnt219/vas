import {
	MutableRefObject,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';

export const useDropdown = (
	ref: MutableRefObject<HTMLElement | null>
): boolean => {
	const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);
	const blurTimerId = useRef<NodeJS.Timeout | null>(null);

	const handleMouseEnter = useCallback(() => {
		setIsVisibleDropdown(true);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setIsVisibleDropdown(false);
	}, []);

	const handleKeyDown = useCallback(function (
		this: HTMLElement,
		ev: KeyboardEvent
	) {
		// stop bubbling up to the parent
		ev.stopPropagation();

		if (ev.key === 'Enter') {
			ev.preventDefault();
			setIsVisibleDropdown((prev) => !prev);
		}
	},
	[]);

	const handleBlur = useCallback(() => {
		blurTimerId.current = setTimeout(() => {
			if (isVisibleDropdown) {
				setIsVisibleDropdown(false);
			}
		}, 10);
	}, [isVisibleDropdown]);

	const handleFocus = useCallback(() => {
		if (blurTimerId.current) {
			clearTimeout(blurTimerId.current);
			blurTimerId.current = null;
		}
	}, []);

	useEffect(() => {
		const target = ref.current;

		if (target) {
			target.addEventListener('mouseenter', handleMouseEnter);
			target.addEventListener('mouseleave', handleMouseLeave);
			target.addEventListener('keydown', handleKeyDown);
			target.addEventListener('blur', handleBlur);
			target.addEventListener('focus', handleFocus);
		}

		return () => {
			if (target) {
				target.removeEventListener('mouseenter', handleMouseEnter);
				target.removeEventListener('mouseleave', handleMouseLeave);
				target.removeEventListener('keydown', handleKeyDown);
				target.removeEventListener('blur', handleBlur);
				target.removeEventListener('focus', handleFocus);
			}
		};
	}, [
		ref,
		handleBlur,
		handleFocus,
		handleKeyDown,
		handleMouseEnter,
		handleMouseLeave,
	]);

	return isVisibleDropdown;
};
