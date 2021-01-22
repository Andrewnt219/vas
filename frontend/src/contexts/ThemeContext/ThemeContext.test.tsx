import '@mock/matchMedia.mock';
import { render } from '@testing-library/react';
import { ThemeProvider } from './ThemeContext';
it('should pass', () => {
	render(<ThemeProvider></ThemeProvider>);
	expect(true).toBeFalsy();
});

export {};
