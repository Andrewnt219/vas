import { renderHook } from '@testing-library/react-hooks/dom';
import { useRouter } from 'next/router';
import { useRouteMatch } from './useRouteMatch';

jest.mock('next/router');
const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

mockedUseRouter.mockImplementation(() => ({
	asPath: '/events/1',
	route: '',
	basePath: '/',
	query: {},
	pathname: '/events',
	push: jest.fn(),
	back: jest.fn(),
	replace: jest.fn(),
	reload: jest.fn(),
	prefetch: jest.fn(),
	beforePopState: jest.fn(),
	isFallback: false,
	isReady: true,
	events: { emit: jest.fn(), off: jest.fn(), on: jest.fn() },
	isLocaleDomain: true,
	isPreview: false,
}));

describe('not exact', () => {
	it('should be active with full match', () => {
		const { result } = renderHook(() => useRouteMatch('/events/1', false));
		expect(result.current).toBe(true);
	});

	it('should be active with partial match', () => {
		const { result } = renderHook(() => useRouteMatch('/events', false));
		expect(result.current).toBe(true);
	});

	it('should be inactive with mismatch', () => {
		const { result } = renderHook(() => useRouteMatch('/home', false));
		expect(result.current).toBe(false);
	});
});

describe('exact', () => {
	it('should be active wiht full match', () => {
		const { result } = renderHook(() => useRouteMatch('/events/1', true));
		expect(result.current).toBe(true);
	});

	it('should be inactive with partial match', () => {
		const { result } = renderHook(() => useRouteMatch('/events', true));
		expect(result.current).toBe(false);
	});

	it('should be inactive with mismatch', () => {
		const { result } = renderHook(() => useRouteMatch('/home', true));
		expect(result.current).toBe(false);
	});
});
