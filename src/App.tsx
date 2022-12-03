// import './reset.css';
import './App.css';
import GlobalStyle from './components/GlobalStyle';
import Todo from './components/Todo';
import React from 'react';
import { useState, useEffect } from 'react';
import { createContext } from 'react';
import { TodoContextProvider } from './contexts/TodoContext';

function App() {
  return (
    <div className='App'>
      <GlobalStyle />
      <TodoContextProvider>
        <Todo />
      </TodoContextProvider>
    </div>
  );
}

export default App;
