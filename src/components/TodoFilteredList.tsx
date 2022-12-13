import { useTodoState } from '../contexts/TodoContext';
import { getDaysPassed } from './dateFormatter';
import TodoItem from './TodoItem';
import styled from 'styled-components';

const FilteredListBox = styled.div`
	margin-bottom: 4em;
	&:last-child {
		margin-bottom: 0;
	}
`;
const FilteredListTitle = styled.h2`
	color: var(--color-accent-light);
	font-size: var(--font-size-14);
	font-weight: 700;
`;

export default function TodoFilteredList() {
	const todos = useTodoState();

	return (
		<div style={{marginTop: '3em'}}>
			<FilteredListBox>
				<FilteredListTitle>오늘</FilteredListTitle>
				<ul>
					{todos.map(todo => {
						if(!todo.isDone && getDaysPassed(new Date()) === getDaysPassed(todo.date)) {
							return <TodoItem todo={todo} key={todo.id}></TodoItem>
						}
					})}
				</ul>
			</FilteredListBox>
			<FilteredListBox>
				<FilteredListTitle>다음</FilteredListTitle>
				<ul>
					{todos.map(todo => {
						if(!todo.isDone && getDaysPassed(todo.date) > 0) {
							return <TodoItem todo={todo} key={todo.id}></TodoItem>
						}
					})}
				</ul>
			</FilteredListBox>
			<FilteredListBox>
				<FilteredListTitle>지난</FilteredListTitle>
				<ul>
					{todos.map(todo => {
							if(!todo.isDone && getDaysPassed(todo.date) < 0) {
								return <TodoItem todo={todo} key={todo.id}></TodoItem>
							}
						})}
				</ul>
			</FilteredListBox>
			<FilteredListBox>
				<FilteredListTitle>완료된</FilteredListTitle>
				<ul>
					{todos.map(todo => {
						if(todo.isDone) {
							return <TodoItem todo={todo} key={todo.id}></TodoItem>
						}
					})}
				</ul>
			</FilteredListBox>
		</div>
	);
}