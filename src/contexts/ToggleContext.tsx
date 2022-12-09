import { createContext, Dispatch, useState, useContext } from 'react';

export const ToggleContext = createContext<boolean>(true);

type toggleDispatch = Dispatch<boolean>
export const ToggleDispatchContext = createContext<toggleDispatch | undefined>(undefined);

export function useToggleState() {
  const toggle = useContext(ToggleContext);
  return toggle;
}

export function useToggleDispatch() {
  const dispatch = useContext(ToggleDispatchContext);
	if(!dispatch) throw new Error('ToggleDispatchContext not found');
	return dispatch;
}

export default function ToggleProvider({children}: {children: React.ReactNode}) {
	const [isShowCheckedItem, dispatch] = useState(true);

	return (
		<ToggleDispatchContext.Provider value={dispatch}>
			<ToggleContext.Provider value = {isShowCheckedItem}>
				{children}
			</ToggleContext.Provider>
		</ToggleDispatchContext.Provider>
	);
}