import '@mock/matchMedia.mock';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';
import { useDarkTheme } from './useDarkTheme';

beforeEach(() => {
	localStorage.clear();
});

describe('initial render', () => {
	it('should be os by default', () => {
		const { result } = renderHook(() => useDarkTheme());
		expect(localStorage.__STORE__['theme']).toBeUndefined();
		expect(result.current[0]).toBe('os');
	});

	it('should initially be dark if local storage has theme dark', () => {
		localStorage.setItem('theme', 'dark');

		const { result } = renderHook(() => useDarkTheme());
		expect(result.current[0]).toBe('dark');
		expect(localStorage.__STORE__['theme']).toBe('dark');
	});

	it('should initially be light if local storage has theme light', () => {
		localStorage.setItem('theme', 'light');

		const { result } = renderHook(() => useDarkTheme());
		expect(result.current[0]).toBe('light');
		expect(localStorage.__STORE__['theme']).toBe('light');
	});
});

describe('on theme set', () => {
	it('should be dark theme', () => {
		const { result } = renderHook(() => useDarkTheme());

		const [, setTheme] = result.current;
		act(() => setTheme('dark'));
		expect(result.current[0]).toBe('dark');
	});

	it('should be light theme', () => {
		const { result } = renderHook(() => useDarkTheme());

		const [, setTheme] = result.current;
		act(() => setTheme('light'));

		expect(result.current[0]).toBe('light');
	});

	it('should be os theme', () => {
		const { result } = renderHook(() => useDarkTheme());

		const [, setTheme] = result.current;
		act(() => setTheme('os'));

		expect(result.current[0]).toBe('os');
	});
});
