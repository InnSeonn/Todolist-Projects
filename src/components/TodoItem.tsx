import styled from 'styled-components';
import { RiDeleteBin6Line } from 'react-icons/ri';

const TodoItemLayout = styled.li`
position: relative;
margin: 0.5em 0;
`;
const TodoItemRow = styled.div`
display: flex;
align-items: center;
`;
const TodoItemCheckbox = styled.label`
display: block;
width: 0.875rem;
height: 0.875rem;
margin-right: 0.5rem;
border-radius: 50%;
border: 1px solid var(--color-grey-light);
cursor: pointer;
&:hover {
	background-color: var(--color-primary);
	transition: background-color 0.3s;
}
`;
const TodoItemInput = styled.input`
min-width: 320px;
padding: 0.2em;
color: var(--color-primary-dark);
font-size: var(--font-size-16);
font-weight: 500;
&::placeholder {
	color: var(--color-grey-light);
}
`;
const TodoItemButton = styled.button`
position: absolute;
top: 0;
right: 0;
height: 100%;
color: var(--color-grey-light);
`;
const TodoItemDateButton = styled(TodoItemButton)`
// color: var(--color-grey-light);
font-size: var(--font-size-14);
transform: translateX(-2.5em);
&:hover {
	color: var(--color-primary-dark);
	transition: color 0.3s;
}
`;
const TodoItemDeleteButton = styled(TodoItemButton)`
// color: var(--color-grey-light);
display: flex;
align-items: center;
&:hover {
	color: var(--color-accent-light);
	transition: color 0.3s;
}
svg {
	width: 1.25rem;
	height: 1.25rem;
}
`;

export default function TodoItem() {
	return (
		<TodoItemLayout>
			<TodoItemRow>
				<input type='checkbox' name='isDone' id='isDone' style={{display: 'none'}}/>
				<TodoItemCheckbox htmlFor='isDone'></TodoItemCheckbox>
				<TodoItemInput type='text' maxLength={15} placeholder='할 일을 잊지 말자!' />
			</TodoItemRow>
			<TodoItemDateButton>오늘</TodoItemDateButton>
			<TodoItemDeleteButton><RiDeleteBin6Line/></TodoItemDeleteButton>
		</TodoItemLayout>
	);
}