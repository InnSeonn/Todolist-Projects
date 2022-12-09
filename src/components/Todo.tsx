import styled from 'styled-components';
import { BiCategory } from 'react-icons/bi';
import { MdChecklist } from 'react-icons/md';
import TodoList from './TodoList';

/** 스타일 **/
const TodoArticle = styled.article`
  position: relative;
  max-width: var(--max-width);
  width: 100%;
  height: 100%;
  padding: 2em;
  padding-top: 3em;
  padding-bottom: 4em;
  margin: 0 auto;
  background: #fff;
`;
const TodoToggleButton = styled.button`
  margin-right: 1em;
  color: var(--color-primary-dark);
  font-size: var(--font-size-16);
  opacity: 0.5;
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export default function Todo() {

  return (
    <TodoArticle className='list'>
      <div>
        <TodoToggleButton className='filterBtn'><BiCategory/></TodoToggleButton>
        <TodoToggleButton className='isDoneBtn'><MdChecklist/></TodoToggleButton>
      </div>
      <TodoList />
    </TodoArticle>
  );
}
