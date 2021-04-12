import { createContext, ReactNode, useContext, useState } from 'react';

type ContextProps = string;

const SizesContext = createContext<ContextProps | undefined>(undefined);

type ProviderProps = {
	children: ReactNode;
	initialContext: ContextProps;
};
export const SizesProvider = ({ children, initialContext }: ProviderProps) => {
	const [sizes] = useState<ContextProps>(initialContext);

	return (
		<SizesContext.Provider value={sizes}>{children}</SizesContext.Provider>
	);
};

export const useSizes = () => {
	const context = useContext(SizesContext);

	if (context === undefined) {
		throw new Error('Must be use under SizesContext');
	}

	return context;
};
