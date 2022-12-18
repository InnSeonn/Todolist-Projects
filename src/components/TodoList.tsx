import styled from 'styled-components';
import TodoItem from './TodoItem';
import { TodoState, useTodoState } from '../contexts/TodoContext';
import { getDaysPassed } from './dateFormatter';
import { useToggleState } from '../contexts/ToggleContext';

export const TodoListLayout = styled.div`
  overflow: auto;
	padding-right: 1.5em;
	&::-webkit-scrollbar {
		width: 4px;
		height: 4px;

		&-track {
			border-radius: 4px;
			background-color: rgba(227, 233, 255, 0.5);
		}
		&-thumb {
			border-radius: 4px;
			background-color: rgb(175, 126, 234, 0.5);
		}
	}
`;
export const TodoListBox = styled.div`
	margin-top: 2em;
	&:first-child {
		margin-top: 0;
	}
`;
export const TodoListTitle = styled.h2`
	color: var(--color-accent-light);
	font-size: var(--font-size-14);
	font-weight: 700;
`;

export function getSortedTodos(todos: TodoState) {
	let daysPassed = new Set(); //중복값 제거
	todos.map(v => daysPassed.add(getDaysPassed(v.date)));

	//과거 → 미래 날짜순으로 정렬
	let sorted: TodoState = [];
	[...daysPassed].sort((a, b) => Number(a) - Number(b)).map(dp => {
		sorted = [...sorted, ...todos.filter(v => getDaysPassed(v.date) === dp)];
	});

	return sorted;
}

/** 완료된 할 일의 배열을 반환하는 함수 */
function getDoneTodos(todos: TodoState) {
	return [...todos.filter(todo => todo.isDone === true)];
}

/** 완료되지 않은 할 일의 배열을 반환하는 함수 */
function getUnDoneTodos(todos: TodoState) {
	return [...todos.filter(todo => todo.isDone === false)];
}

export default function TodoList() {
	const todos = getSortedTodos(useTodoState());
	const toggle = useToggleState();

	return (
		<TodoListLayout as='ul'>
			<TodoListBox>
				<TodoListTitle>해야 할 일</TodoListTitle>
				<ul>
					{getUnDoneTodos(todos).map(todo => <TodoItem todo={todo} key={todo.id}/>)}
				</ul>
			</TodoListBox>
			{toggle.checked && getDoneTodos(todos).length > 0 &&
			<TodoListBox>
				<TodoListTitle>완료된</TodoListTitle>
				<ul>
					{getDoneTodos(todos).map(todo => <TodoItem todo={todo} key={todo.id}/>)}
				</ul>
			</TodoListBox>}
		</TodoListLayout>
	);
}