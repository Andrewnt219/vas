// NOTE do not place the tracking id inside an environment variable
// The app will not correctly update user location on client side routing
export const GA_TRACKING_ID = 'UA-190252089-1';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
	window.gtag('config', GA_TRACKING_ID, {
		page_path: url,
	});
};

type GTagEvent = {
	action: string;
	category: string;
	label: string;
	value: number;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
	window.gtag('event', action, {
		event_category: category,
		event_label: label,
		value: value,
	});
};
