import { useTodoState, TodoState } from '../contexts/TodoContext';
import { getDaysPassed } from './dateFormatter';
import TodoItem from './TodoItem';
import styled from 'styled-components';
import { useToggleState } from '../contexts/ToggleContext';
import { TodoListLayout, TodoListBox, TodoListTitle, getSortedTodos } from './TodoList';

const FilteredListBox = styled(TodoListBox)<{display?: string}>`
	display: ${(props) => props.display || 'block'};
`;

export default function TodoFilteredList() {
	const todos = getSortedTodos(useTodoState());
	const toggle = useToggleState();

	function getTargetTodos(target: string): TodoState | null {
		let targetTodos: TodoState = [];
		switch(target) {
			case 'TODAY': {
				targetTodos = todos.filter(todo => !todo.isDone && getDaysPassed(new Date()) === getDaysPassed(todo.date));
				break;
			}
			case 'NEXT': {
				targetTodos = todos.filter(todo => !todo.isDone && getDaysPassed(todo.date) > 0);
				break;
			}
			case 'PASSED': {
				targetTodos = todos.filter(todo => !todo.isDone && getDaysPassed(todo.date) < 0);
				break;
			}
			case 'DONE': {
				targetTodos = todos.filter(todo => todo.isDone);
				break;
			}
		}
		return targetTodos.length <= 0 ? null : targetTodos;
	}

	return (
		<TodoListLayout>
			{getTargetTodos('TODAY') &&
			<FilteredListBox>
				<TodoListTitle>오늘</TodoListTitle>
				<ul>
					{getTargetTodos('TODAY')?.map(todo => {
						return <TodoItem todo={todo} key={todo.id}></TodoItem>
					})}
				</ul>
			</FilteredListBox>}
			{getTargetTodos('NEXT') &&
				<FilteredListBox>
				<TodoListTitle>다음</TodoListTitle>
				<ul>
					{getTargetTodos('NEXT')?.map(todo => {
						return <TodoItem todo={todo} key={todo.id}></TodoItem>
					})}
				</ul>
			</FilteredListBox>}
			{getTargetTodos('PASSED') &&
				<FilteredListBox>
				<TodoListTitle>지난</TodoListTitle>
				<ul>
					{getTargetTodos('PASSED')?.map(todo => {
						return <TodoItem todo={todo} key={todo.id}></TodoItem>
					})}
				</ul>
			</FilteredListBox>}
			{getTargetTodos('DONE') && toggle.checked &&
				<FilteredListBox>
					<TodoListTitle>완료된</TodoListTitle>
					<ul>
						{getTargetTodos('DONE')?.map(todo => {
							return <TodoItem todo={todo} key={todo.id}></TodoItem>
						})}
					</ul>
				</FilteredListBox>
			}
		</TodoListLayout>
	);
}