import styled from 'styled-components';
import GlobalStyle from './components/GlobalStyle';
import Todo from './components/Todo';
import { TodoContextProvider } from './contexts/TodoContext';
import Header from './components/Header';
import AddButton from './components/AddButton';
import ToggleProvider from './contexts/ToggleContext';
import { NewTodoContextProvider } from './contexts/NewTodoContext';
import { useEffect } from 'react';

const AppLayout = styled.div`
  overflow: hidden;
  height: calc(var(--vh, 1vh) * 100);
`;
const AppBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: padding 0.3s;
  @media screen and (min-width: 500px) {
    padding: 20px;
    padding-bottom: 0;
    background-color: var(--color-bg);
  }
  @media screen and (min-width: 768px) {
    padding: 5vh 20px;
    padding-bottom: calc(5vh - 2.8em);
  }
`;

function App() {
  useEffect(() => {
    window.addEventListener('resize', () => { //모바일 웹 상하단바 크기 제외
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    })
  }, []);

  return (
    <AppLayout className='App'>
      <GlobalStyle />
      <AppBox>
        <Header/>
        <TodoContextProvider>
          <NewTodoContextProvider>
            <ToggleProvider>
              <Todo/>
            </ToggleProvider>
            <AddButton />
          </NewTodoContextProvider>
        </TodoContextProvider>
      </AppBox>
    </AppLayout>
  );
}

export default App;
