import { MemberDocument } from '@lib/prismic/component-types/member/MemberModel';
import { createContext, ReactNode, useContext, useState } from 'react';

type ContextProps = MemberDocument[];

const MembersContext = createContext<ContextProps>([]);

type ProviderProps = {
	children: ReactNode[] | ReactNode;
	initialContext?: ContextProps;
};
export const MembersProvider = ({
	children,
	initialContext = [],
}: ProviderProps) => {
	const [members] = useState<ContextProps>(initialContext);

	return (
		<MembersContext.Provider value={members}>
			{children}
		</MembersContext.Provider>
	);
};

export const useMembers = (): ContextProps => {
	return useContext(MembersContext);
};
