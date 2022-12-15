import { useTodoState } from '../contexts/TodoContext';
import { getDaysPassed } from './dateFormatter';
import TodoItem from './TodoItem';
import styled from 'styled-components';
import { useToggleState } from '../contexts/ToggleContext';
import { useEffect } from 'react';

export const ScrollLayout = styled.div`
  overflow: auto;
	padding-right: 1.5em;
	margin-top: 2em;
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
const FilteredListBox = styled.div<{display?: string}>`
	display: ${(props) => props.display || 'block'};
	margin-bottom: 3em;
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
	}, [todos, toggle]);

	return (
		<ScrollLayout>
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
			{toggle.checked &&
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
			}
		</ScrollLayout>
	);
}