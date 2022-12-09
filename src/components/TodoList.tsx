import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from '../contexts/TodoContext';

export default function TodoList() {
	const todos = useTodoState();
	
	return (
		<ul style={{marginTop: '2em'}}>
			{todos.map(todo => <TodoItem todo={todo} key={todo.id}/>)}
		</ul>
	);
}