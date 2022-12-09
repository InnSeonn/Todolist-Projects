import styled from 'styled-components';
import { GoPlus } from 'react-icons/go';
import { useTodoState, useTodoDispatch } from '../contexts/TodoContext';

const Button = styled.button`
  position: relative;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0.8em 2em;
  border-radius: 2rem;
  background-color: var(--color-primary);
  color: #fff;
  font-size: var(--font-size-16);
  font-weight: 600;
  transform: translateY(-50%);
  svg {
    margin-left: 0.5em;
  }
`;

export default function AddButton() {
	const todos = useTodoState();
	const dispatch = useTodoDispatch();

	function addNewTodoItem() {
		dispatch({
			type: 'CREATE',
      date: new Date(),
		});
	}

	return (
		<Button type='button' onClick={addNewTodoItem}>ADD NEW <GoPlus/></Button>
	);
}