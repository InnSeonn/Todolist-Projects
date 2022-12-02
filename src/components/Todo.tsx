import GlobalStyle from './GlobalStyle';
import styled from 'styled-components';
import { BiCategory } from 'react-icons/bi';
import { MdChecklist } from 'react-icons/md';
import { GoPlus } from 'react-icons/go';
import TodoItem from './TodoItem';
import Header from './Header';

const TodoLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  padding: 6.25rem 2rem;
  background-color: var(--color-bg);
`;
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
const TodoForm = styled.form`
  
`;
const TodoList = styled.ul`
  margin-top: 1em;
`;
const TodoNewButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 50%;
  display: flex;
  align-items: center;
  padding: 0.8em 2em;
  border-radius: 2rem;
  background-color: var(--color-primary);
  color: #fff;
  font-size: var(--font-size-16);
  font-weight: 600;
  transform: translate(-50%, 50%);
  svg {
    margin-left: 0.5em;
  }
`;

export default function Todo() {
  return (
    <>
    <GlobalStyle />
    <TodoLayout className='container'>
      <Header/>
      <TodoArticle className='list'>
        <div>
          <TodoToggleButton className='filterBtn'><BiCategory/></TodoToggleButton>
          <TodoToggleButton className='isDoneBtn'><MdChecklist/></TodoToggleButton>
        </div>
        <TodoForm action='#'>
          <TodoList>
            <TodoItem/>
          </TodoList>
          <TodoNewButton type='button'>ADD NEW <GoPlus/></TodoNewButton>
        </TodoForm>
      </TodoArticle>
    </TodoLayout>
    </>
  );
}
