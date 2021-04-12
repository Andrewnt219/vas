import { MutableRefObject, useEffect, useRef } from 'react';

export const useImageSwap = (): MutableRefObject<HTMLImageElement | null> => {
	const imgRef = useRef<HTMLImageElement | null>(null);

	// Need to run the swap again everytime src change
	// else getting to new post from a post won't run the swap
	const src = imgRef.current?.src;

	useEffect(() => {
		const imgEl = imgRef.current;

		if (imgEl) {
			const dataSrc = imgEl.getAttribute('data-src');
			if (dataSrc) {
				imgEl.setAttribute('src', dataSrc);
			}

			const dataSrcSet = imgEl.getAttribute('data-srcset');
			if (dataSrcSet) {
				imgEl.setAttribute('srcset', dataSrcSet);
			}
		}
	}, [src]);

	return imgRef;
};
