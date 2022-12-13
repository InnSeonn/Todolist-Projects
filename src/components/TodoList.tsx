import styled from 'styled-components';
import TodoItem from './TodoItem';
import { TodoState, useTodoState } from '../contexts/TodoContext';
import { getDaysPassed } from './dateFormatter';

function getSortedTodos(todos: TodoState) {
	let daysPassed = new Set();
	todos.map(v => daysPassed.add(getDaysPassed(v.date)));

	//과거 → 미래 날짜순으로 정렬
	let sorted: TodoState = [];
	[...daysPassed].sort((a, b) => Number(a) - Number(b)).map(dp => {
		sorted = [...sorted, ...todos.filter(v => getDaysPassed(v.date) === dp)];
	});
	return sorted;
}

export default function TodoList() {
	const todos = getSortedTodos(useTodoState());
	
	return (
		<ul style={{marginTop: '2em'}}>
			{todos.map(todo => <TodoItem todo={todo} key={todo.id}/>)}
		</ul>
	);
}