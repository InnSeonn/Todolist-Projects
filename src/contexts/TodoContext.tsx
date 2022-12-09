import { createContext, Dispatch, useReducer, useContext } from 'react';
import styled from 'styled-components';
import TodoList from '../components/TodoList';

export type Todo = {
  id: number;
  text: string;
  date: Date;
  isDone: boolean;
};
export type TodoState = Todo[];
export const tempTodo: TodoState = [{
  id: 0,
  text: '텍스트를 클릭하여 할 일을 수정하세요',
  date: new Date(),
  isDone: false,
}];
export const TodoStateContext = createContext<TodoState | undefined>(undefined);

type Action =
| { type: 'CREATE', date: Date; }
| { type: 'UPDATE'; id: number, text: string, date: Date }
| { type: 'TOGGLE'; id: number }
| { type: 'DELETE'; id: number } 
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
		const obj: TodoState = JSON.parse(data);
		obj.map(v => v.date = new Date(v.date));
		return obj;
	} else {
		return tempTodo;
	}
}

function todoReducer(state: TodoState, action: Action) :TodoState {
	let newState = state;
	switch(action.type) {
		case 'CREATE': { //새로운 할 일 생성 - 수정하지 않으면 저장하지 않음
			return [...state, {
				id: state.length === 0 ? 0 : state[state.length - 1].id + 1,
				text: '',
				date: action.date,
				isDone: false,
			}];
			// break;
		}
		case 'UPDATE': { //기존 할 일 수정
			newState = state.map(v => {
				if(v.id === action.id) {
					v.text = action.text;
					v.date = action.date;
				} return v;
			});
			break;
		}
		case 'TOGGLE': { //체크박스 토글
			newState = state.map(v => {
				if(v.id === action.id) {
					v.isDone = !v.isDone;
				} return v;
			});
			break;
		}
		case 'DELETE': { //할 일 삭제
			newState = state.filter(v => v.id !== action.id);
			break;
		}
	}
	window.localStorage.setItem('todo', JSON.stringify(newState.filter(todo => todo.text !== ''))); //작성하지 않은 할 일 제거
	return newState;
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
