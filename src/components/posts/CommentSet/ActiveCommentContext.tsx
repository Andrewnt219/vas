import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useMemo,
	useState,
} from 'react';

type State = string | null;
type Context = {
	activeWriterId: State;
	setActiveWriterId: Dispatch<SetStateAction<State>>;
};
const Context = createContext<Context | undefined>(undefined);

type ProviderProps = {
	children: ReactNode;
};
export const ActiveCommentProvider = ({ children }: ProviderProps) => {
	const [activeWriterId, setActiveWriterId] = useState<State>(null);

	const context = useMemo(() => ({ activeWriterId, setActiveWriterId }), [
		activeWriterId,
	]);
	return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useActiveComment = () => {
	const context = useContext(Context);

	if (context === undefined) {
		throw new Error('Must be used under ActiveCommentProvider');
	}

	return context;
};
