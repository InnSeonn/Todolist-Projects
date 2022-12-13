import { createContext, Dispatch, useState, useContext, useReducer } from 'react';

type ToggleState = {
	filter: boolean,
	checked: boolean,
};

export const ToggleContext = createContext<ToggleState>({
	filter: true,
	checked: true,
});

type Action = 
| { type: 'FILTER', toggle: boolean }
| { type: 'CHECKED', toggle: boolean}
type toggleDispatch = Dispatch<Action>
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

function toggleReducer(state: ToggleState, action: Action) :ToggleState {
	switch(action.type) {
		case 'FILTER':
			return {
				filter: action.toggle,
				checked: state.checked,
			};
		case 'CHECKED':
			return {
				filter: state.filter,
				checked: action.toggle,
			};
	}
}

export default function ToggleProvider({children}: {children: React.ReactNode}) {
	// const [toggle, dispatch] = useState(true);
	const [toggle, dispatch] = useReducer(toggleReducer, {
		filter: true,
		checked: true,
	});

	return (
		<ToggleDispatchContext.Provider value={dispatch}>
			<ToggleContext.Provider value = {toggle}>
				{children}
			</ToggleContext.Provider>
		</ToggleDispatchContext.Provider>
	);
}