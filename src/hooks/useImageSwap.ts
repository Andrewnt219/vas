import { MutableRefObject, useEffect, useRef } from 'react';

export const useImageSwap = (): MutableRefObject<HTMLImageElement | null> => {
	const imgRef = useRef<HTMLImageElement | null>(null);

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
	}, []);

	return imgRef;
};
