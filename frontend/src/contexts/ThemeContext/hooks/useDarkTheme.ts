import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'os';

export const useDarkTheme = (): [
	theme: Theme,
	setTheme: Dispatch<SetStateAction<Theme>>
] => {
	const [theme, setTheme] = useState<Theme>('os');

	// The logic for dark before this is executed in _document
	useEffect(() => {
		if ('theme' in localStorage) {
			setTheme(localStorage.theme);
		}
	}, []);

	useEffect(() => {
		switch (theme) {
			case 'dark':
				localStorage.theme = 'dark';
				document.documentElement.classList.add('dark');

				break;

			case 'light':
				localStorage.theme = 'light';
				document.documentElement.classList.remove('dark');

				break;

			case 'os':
				localStorage.removeItem('theme');

				if (window.matchMedia('(prefers-color-scheme: dark)').matches)
					document.documentElement.classList.add('dark');
				else {
					document.documentElement.classList.remove('dark');
				}

				break;

			default:
				throw new Error('Unexpected theme!');
		}
	}, [theme]);

	return [theme, setTheme];
};
