import { useTodoState } from '../contexts/TodoContext';
import { getDaysPassed } from './dateFormatter';
import TodoItem from './TodoItem';
import styled from 'styled-components';
import { useToggleState } from '../contexts/ToggleContext';
import { useEffect } from 'react';

const FilteredListBox = styled.div<{display?: string}>`
	display: ${(props) => props.display || 'block'};
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
	const toggle = useToggleState();

	useEffect(() => {
		const parents = document.querySelectorAll(FilteredListBox) as NodeListOf<HTMLElement>;
		[...parents].map(parent => {
			if(!parent.querySelector('li')) {
				parent.style.display = 'none';
			} else {
				parent.style.display = 'block';
			}
		});
	}, [todos]);

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
			<FilteredListBox display={toggle.checked ? 'block' : 'none'}>
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