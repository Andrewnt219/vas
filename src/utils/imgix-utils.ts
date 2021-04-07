export const getSrcSet = (imgSrc: string): string => {
	return `				
    ${imgSrc}&w=3840 3840w,
    ${imgSrc}&w=2048 2048w,
    ${imgSrc}&w=1920 1920w,
    ${imgSrc}&w=1200 1200w,
    ${imgSrc}&w=1080 1080w,
    ${imgSrc}&w=828 828w,
    ${imgSrc}&w=750 750w,
    ${imgSrc}&w=640 640w
  `;
};

export const getLqip = (imgSrc: string) => {
	return `${imgSrc}&w=500&px=10&blur=200`;
};
