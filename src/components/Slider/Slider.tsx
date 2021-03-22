import { routes } from '@data/routes-data';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

type Props = { className?: string };

function Slider({ className }: Props) {
	const { t } = useTranslation('common');
	return (
		<div className={className} tw="fixed top-0 left-0 w-full h-full bg-white">
			{routes.map((route) => (
				<h1 key={route.href.toString()}>
					{' '}
					{t(`navbar.${route.i18nKey}`, null, { fallback: '...' })}
				</h1>
			))}
		</div>
	);
}

export default Slider;
