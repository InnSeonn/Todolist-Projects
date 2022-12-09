import styled from 'styled-components';
import TodoList from './TodoList';
import { createContext, useState, useContext } from 'react';
import ToggleProvider, { useToggleState } from '../contexts/ToggleContext';
import TodoToggleButton from '../components/TodoToggleButton';

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

export default function Todo() {
  return (
    <ToggleProvider>
      <TodoArticle className='list'>
        <TodoToggleButton />
        <TodoList />
      </TodoArticle>
    </ToggleProvider>
  );
}
