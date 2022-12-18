import styled from 'styled-components';
import GlobalStyle from './components/GlobalStyle';
import Todo from './components/Todo';
import { TodoContextProvider } from './contexts/TodoContext';
import Header from './components/Header';
import AddButton from './components/AddButton';
import ToggleProvider from './contexts/ToggleContext';
import { NewTodoContextProvider } from './contexts/NewTodoContext';

const AppLayout = styled.div`
  overflow: hidden;
  height: 100vh;
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
