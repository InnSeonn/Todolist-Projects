import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

type NewTodoState = {
	isNew: number,
	setIsNew: Dispatch<SetStateAction<number>>,
}
const NewTodoStateContext = createContext<NewTodoState | undefined>(undefined);

export function useNewTodoState() {
	const state = useContext(NewTodoStateContext);
	if(state === undefined) {
		throw new Error('NewTodoContextProvider not found')
	}
	return state;
}

export function NewTodoContextProvider({children}: {children: React.ReactNode}){
	const [isNew, setIsNew] = useState(-1);

	return (
		<NewTodoStateContext.Provider value={{isNew, setIsNew}}>
			{children}
		</NewTodoStateContext.Provider>
	);
}