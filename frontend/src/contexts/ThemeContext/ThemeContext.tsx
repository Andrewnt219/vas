import { useDarkTheme } from '@src/contexts/ThemeContext/hooks/useDarkTheme';
import React, { createContext, ReactElement, ReactNode } from 'react';

type Theme = ReturnType<typeof useDarkTheme>[0];
type SetTheme = ReturnType<typeof useDarkTheme>[1];
type ThemeProviderProps = {
	children?: ReactNode;
};

const ThemeContext = createContext<Theme | undefined>(undefined);
const ThemeUpdaterContext = createContext<SetTheme | undefined>(undefined);

function ThemeProvider({ children }: ThemeProviderProps): ReactElement {
	const [theme, setTheme] = useDarkTheme();

	return (
		<ThemeContext.Provider value={theme}>
			<ThemeUpdaterContext.Provider value={setTheme}>
				{children}
			</ThemeUpdaterContext.Provider>
		</ThemeContext.Provider>
	);
}

function useTheme(): Theme {
	const theme = React.useContext(ThemeContext);

	if (theme === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}

	return theme;
}

function useThemeUpdater(): SetTheme {
	const setTheme = React.useContext(ThemeUpdaterContext);

	if (setTheme === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}

	return setTheme;
}

export { ThemeProvider, useTheme, useThemeUpdater };
