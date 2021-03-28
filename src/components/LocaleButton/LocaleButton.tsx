import { StyledDropDownItem } from '@components/Appbar/components/DropDownItem/DropDownItem';
import { DropDownContainer } from '@components/Appbar/components/DropdownItemSet/DropDownItemSet';
import { Language } from '@data/localization-data';
import { useDropdown } from '@src/hooks/useDropdown';
import { isValidLocale } from '@utils/validate-utils';
import useTranslation from 'next-translate/useTranslation';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { css } from 'twin.macro';

type Props = { className?: string };

function LocaleButton({ className }: Props) {
	const { locale, asPath } = useRouter();
	const { t } = useTranslation();
	const containerRef = useRef<HTMLDivElement | null>(null);

	const isVisibleDropdown = useDropdown(containerRef);
	const locales: Record<Language, { text: string; iconSrc: string }> = {
		'en-US': {
			text: t('common:locales.en-US'),
			iconSrc: '/svg/american-flag.svg',
		},
		'vi-VN': {
			text: t('common:locales.vi-VN'),
			iconSrc: '/svg/vietnam-flag.svg',
		},
	};

	const currentLocale = isValidLocale(locale)
		? locales[locale]
		: locales['en-US'];

	return (
		<div className={className} tw="relative mt-4" ref={containerRef}>
			<button tw="flex space-x-2 font-bold shadow-card px-5 py-2 rounded-full bg-primary text-white">
				<span>{currentLocale.text}</span>
			</button>

			{isVisibleDropdown && (
				<DropDownContainer tw="w-max">
					{Object.entries(locales).map(([key, value]) => (
						<li key={key} tw="relative flex space-x-2 items-center">
							<img
								src={value.iconSrc}
								alt={`Switch to ${value.text}`}
								css={css`
									width: 1.25em;
									height: 1.25em;
								`}
							/>
							<NextLink href={{ href: asPath }} locale={key} passHref>
								<StyledDropDownItem isActive={locale == key}>
									{value.text}
								</StyledDropDownItem>
							</NextLink>
						</li>
					))}
				</DropDownContainer>
			)}
		</div>
	);
}

export default LocaleButton;
