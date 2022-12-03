import styled from 'styled-components';
import { BiCategory } from 'react-icons/bi';
import { MdChecklist } from 'react-icons/md';
import TodoItem from './TodoItem';
import Header from './Header';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { useTodoState, useTodoDispatch } from '../contexts/TodoContext';
import AddButton from './AddButton';

/** 스타일 **/
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

export default function Todo() {
  const todos = useTodoState();

  return (
    <TodoLayout className='container'>
      <Header/>
      <TodoArticle className='list'>
        <div>
          <TodoToggleButton className='filterBtn'><BiCategory/></TodoToggleButton>
          <TodoToggleButton className='isDoneBtn'><MdChecklist/></TodoToggleButton>
        </div>
        <TodoForm action='#'>
          <TodoList>
            {todos.map(todo => <TodoItem key={todo.id} todo={todo}/>)}
          </TodoList>
          <AddButton/>
        </TodoForm>
      </TodoArticle>
    </TodoLayout>
  );
}
