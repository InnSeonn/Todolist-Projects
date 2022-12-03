import { createContext, Dispatch, useReducer, useContext } from 'react';

export type Todo = {
  id: number;
  text: string;
  date: string;
  isDone: boolean;
};
export type TodoState = Todo[];
export const tempTodo: TodoState = [{
  id: 0,
  text: '텍스트를 클릭하여 할 일을 수정하세요',
  date: '12월 2일',
  isDone: true,
}];
export const TodoStateContext = createContext<TodoState | undefined>(undefined);

type Action =
| { type: 'CREATE'; text: string, date: string }
| { type: 'UPDATE'; text: string, date: string }
| { type: 'TOGGLE'; id: number }
| { type: 'REMOVE'; id: number } 
type TodoDispatch = Dispatch<Action>;
export const TodoDispatchContext = createContext<TodoDispatch | undefined>(undefined);

export function useTodoState() {
	const state = useContext(TodoStateContext);
	if(!state) throw new Error('TodoProvider not found');
	return state;
}

export function useTodoDispatch() {
	const dispatch = useContext(TodoDispatchContext);
	if(!dispatch) throw new Error('DispatchProvider not found');
	return dispatch;
}

function getTodoData() :TodoState {
	const data = window.localStorage.getItem('todo');
	if(data !== null) {
		return JSON.parse(data);
	} else {
		return tempTodo;
	}
}

function todoReducer(state: TodoState, action: Action) :TodoState {
	switch(action.type) {
		case 'CREATE': { //새로운 할 일 생성
			console.log('CREATE');
			return state;
		}
		case 'UPDATE': { //기존 할 일 수정
			console.log('UPDATE');
			return state;
		}
		case 'TOGGLE': { //체크박스 토글
			console.log('TOGGLE');
			return state;
		}
		case 'REMOVE': { //할 일 삭제
			console.log('REMOVE');
			return state;
		}
	}
}

export function TodoContextProvider({ children }: { children: React.ReactNode }) {
	const [todos, dispatch] = useReducer(todoReducer, getTodoData());
	return (
		<TodoDispatchContext.Provider value={dispatch}>
			<TodoStateContext.Provider value={todos}>
				{children}
			</TodoStateContext.Provider>
		</TodoDispatchContext.Provider>
	);
}

