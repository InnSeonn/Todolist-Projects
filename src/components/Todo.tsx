import styled from 'styled-components';
import TodoList from './TodoList';
import { useToggleState } from '../contexts/ToggleContext';
import TodoToggleButton from '../components/TodoToggleButton';
import TodoFilteredList from './TodoFilteredList';

/** 스타일 **/
const TodoArticle = styled.article`
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: var(--max-width);
  width: 100%;
  padding: 3em 0.5em 3em 2em;
  background: #fff;
`;

export default function Todo() {
  const toggle = useToggleState();

  return (
    <TodoArticle className='list'>
      <TodoToggleButton />
      {toggle.filter ? <TodoFilteredList /> : <TodoList />}
    </TodoArticle>
  );
}
