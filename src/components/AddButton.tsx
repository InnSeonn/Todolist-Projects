import styled from 'styled-components';
import { GoPlus } from 'react-icons/go';
import { useTodoState, useTodoDispatch } from '../contexts/TodoContext';
import { useNewTodoState } from '../contexts/NewTodoContext';
import { TodoItemLayout } from './TodoItem';

const Button = styled.button`
  position: relative;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0.8em 1.4em;
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
  const newTodo = useNewTodoState();
  
	function addNewTodoItem() {
    if(newTodo.isNew > 0) { //새로운 할 일이 이미 추가 되어있는 상태
      const todoItems = [...document.querySelectorAll(TodoItemLayout)] as HTMLElement[];
      const newItem = todoItems.find(todo => Number(todo.dataset.id) === todos[todos.length - 1].id);

      if(newItem) {
        newItem.querySelector('textarea')?.focus();
        newItem.classList.add('error');
				setTimeout(() => newItem.classList.remove('error'), 300);
      }
      return ;
    }

		dispatch({
			type: 'CREATE',
      date: new Date(),
		});
    newTodo.setIsNew(todos.length === 0 ? 0 : todos[todos.length - 1].id + 1);
	}

	return (
		<Button type='button' onClick={addNewTodoItem}>ADD NEW <GoPlus/></Button>
	);
}