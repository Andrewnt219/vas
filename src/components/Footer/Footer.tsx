import React, { VFC } from 'react';
import MediaIconAnchor from './components/MediaIconAnchor/MediaIconAnchor';

type Props = {};

/**
 * @description renders the main footer
 */
const Footer: VFC<Props> = ({}) => {
	return (
		<footer
			tw="absolute bottom-0 bg-primary h-36 w-full text-white  flex-center flex-col md:(h-56 text-lg)"
			role="contentinfo"
		>
			<ul tw="flex items-center  space-x-6" aria-label="social medias">
				<li>
					<MediaIconAnchor
						href="https://facebook.com"
						target="_blank"
						rel="noreferrer noopener"
						aria-label="Link to VAS's Facebook"
					>
						<svg
							aria-hidden="true"
							viewBox="0 0 33 33"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clipPath="url(#facebook-svg)">
								<path d="M32.9082 16.4541C32.9082 7.36674 25.5414 0 16.4541 0C7.36674 0 0 7.36674 0 16.4541C0 24.6667 6.01699 31.4739 13.8831 32.7083V21.2103H9.70534V16.4541H13.8831V12.829C13.8831 8.70524 16.3397 6.42738 20.0981 6.42738C21.8977 6.42738 23.7813 6.74874 23.7813 6.74874V10.798H21.7065C19.6626 10.798 19.025 12.0664 19.025 13.3689V16.4541H23.5885L22.859 21.2103H19.025V32.7083C26.8912 31.4739 32.9082 24.6667 32.9082 16.4541Z" />
							</g>
							<defs>
								<clipPath id="facebook-svg">
									<rect width="32.9082" height="32.9082" />
								</clipPath>
							</defs>
						</svg>
					</MediaIconAnchor>
				</li>

				<li>
					<MediaIconAnchor
						href="https://youtube.com"
						target="_blank"
						rel="noreferrer noopener"
						aria-label="Link to VAS's Youtube"
					>
						<svg
							aria-hidden="true"
							width="34"
							height="25"
							viewBox="0 0 34 25"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M32.7513 5.87249C32.7513 5.87249 32.4374 3.60363 31.4706 2.60738C30.2464 1.2962 28.8778 1.28977 28.25 1.21264C23.755 0.878418 17.0063 0.878418 17.0063 0.878418H16.9937C16.9937 0.878418 10.245 0.878418 5.75002 1.21264C5.12223 1.28977 3.75364 1.2962 2.52945 2.60738C1.56266 3.60363 1.25504 5.87249 1.25504 5.87249C1.25504 5.87249 0.928589 8.53985 0.928589 11.2008V13.6946C0.928589 16.3555 1.24876 19.0229 1.24876 19.0229C1.24876 19.0229 1.56266 21.2918 2.52318 22.288C3.74737 23.5992 5.35451 23.5542 6.07019 23.6956C8.64413 23.9463 17 24.0234 17 24.0234C17 24.0234 23.755 24.0105 28.25 23.6828C28.8778 23.6056 30.2464 23.5992 31.4706 22.288C32.4374 21.2918 32.7513 19.0229 32.7513 19.0229C32.7513 19.0229 33.0714 16.362 33.0714 13.6946V11.2008C33.0714 8.53985 32.7513 5.87249 32.7513 5.87249ZM13.679 16.7219V7.47291L22.3613 12.1135L13.679 16.7219Z" />
						</svg>
					</MediaIconAnchor>
				</li>

				<li>
					<MediaIconAnchor
						href="https://linkedin.com"
						target="_blank"
						rel="noreferrer noopener"
						aria-label="Link to VAS's LinkedIn"
					>
						<svg
							aria-hidden="true"
							viewBox="0 0 33 33"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clipPath="url(#linkedin-svg)">
								<path d="M30.564 0H2.52134C1.17802 0 0.0917969 1.06052 0.0917969 2.3717V30.53C0.0917969 31.8412 1.17802 32.9082 2.52134 32.9082H30.564C31.9073 32.9082 33 31.8412 33 30.5365V2.3717C33 1.06052 31.9073 0 30.564 0ZM9.85498 28.0426H4.97018V12.3341H9.85498V28.0426ZM7.41258 10.1938C5.8443 10.1938 4.57811 8.92762 4.57811 7.36577C4.57811 5.80392 5.8443 4.53773 7.41258 4.53773C8.97443 4.53773 10.2406 5.80392 10.2406 7.36577C10.2406 8.9212 8.97443 10.1938 7.41258 10.1938ZM28.1344 28.0426H23.2561V20.4069C23.2561 18.588 23.2239 16.242 20.7172 16.242C18.1784 16.242 17.7928 18.228 17.7928 20.2784V28.0426H12.9208V12.3341H17.6V14.4809H17.6642C18.3134 13.2468 19.9074 11.9421 22.2791 11.9421C27.2218 11.9421 28.1344 15.1943 28.1344 19.4235V28.0426Z" />
							</g>
							<defs>
								<clipPath id="linkedin-svg">
									<rect
										width="32.9082"
										height="32.9082"
										transform="translate(0.0917969)"
									/>
								</clipPath>
							</defs>
						</svg>
					</MediaIconAnchor>
				</li>
			</ul>

			<a tw="mt-4 hocus:(underline outline-none)" href="mailto:vas@seneca.ca">
				vas@seneca.ca
			</a>
		</footer>
	);
};

export default Footer;
