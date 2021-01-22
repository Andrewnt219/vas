import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useMemo,
	useState,
	VFC,
} from 'react';
type Context = [
	isOpened: boolean,
	setIsOpened: Dispatch<SetStateAction<boolean>>
];
const MenuStateContext = createContext<Context | undefined>(undefined);

type ProviderProps = { children: ReactNode };
const MenuStateProvider: VFC<ProviderProps> = ({ children }) => {
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const value: Context = useMemo(() => [isOpened, setIsOpened], [isOpened]);

	return (
		<MenuStateContext.Provider value={value}>
			{children}
		</MenuStateContext.Provider>
	);
};

const useMenuState = (): Context => {
	const context = useContext(MenuStateContext);

	if (!context) {
		throw new Error('useMenuState must be used within a CountProvider');
	}

	return context;
};

export { MenuStateProvider, useMenuState };
