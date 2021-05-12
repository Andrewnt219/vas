import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useMemo,
	useState,
} from 'react';

type ContextProps = [
	isVisible: boolean,
	setIsVisible: Dispatch<SetStateAction<boolean>>
];
const SliderContext = createContext<ContextProps | undefined>(undefined);

type ProviderProps = { children: ReactNode };
export function SliderProvider({ children }: ProviderProps) {
	const [isVisible, setIsVisible] = useState(false);

	const value: ContextProps = useMemo(() => [isVisible, setIsVisible], [
		isVisible,
	]);

	return (
		<SliderContext.Provider value={value}>{children}</SliderContext.Provider>
	);
}

export function useSlider(): ContextProps {
	const context = useContext(SliderContext);

	if (!context) {
		throw new Error('useSlider must be used within a SliderProvider');
	}

	return context;
}
