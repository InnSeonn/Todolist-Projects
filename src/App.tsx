import './App.css';
import styled from 'styled-components';
import GlobalStyle from './components/GlobalStyle';
import Todo from './components/Todo';
import { TodoContextProvider } from './contexts/TodoContext';
import Header from './components/Header';
import AddButton from './components/AddButton';

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  padding: 6.25rem 20px;
  background-color: var(--color-bg);
`;

function App() {
  return (
    <div className='App'>
      <GlobalStyle />
      <AppLayout className='container'>
        <Header/>
        <TodoContextProvider>
          <Todo/>
          <AddButton />
        </TodoContextProvider>
      </AppLayout>
    </div>
  );
}

export default App;
