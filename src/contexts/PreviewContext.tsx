import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type ContextProps = boolean;

const PreviewContext = createContext<ContextProps>(false);

type ProviderProps = { children: ReactNode; initialValue: ContextProps };
export function PreviewProvider({ children, initialValue }: ProviderProps) {
	const [isPreviewMode] = useState(initialValue);

	const value: ContextProps = useMemo(() => isPreviewMode, [isPreviewMode]);

	return (
		<PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>
	);
}

export function usePreview(): ContextProps {
	const context = useContext(PreviewContext);

	return context;
}
