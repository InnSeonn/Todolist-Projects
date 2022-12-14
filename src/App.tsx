import './App.css';
import styled from 'styled-components';
import GlobalStyle from './components/GlobalStyle';
import Todo from './components/Todo';
import { TodoContextProvider } from './contexts/TodoContext';
import Header from './components/Header';
import AddButton from './components/AddButton';
import ToggleProvider from './contexts/ToggleContext';

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: var(--color-bg);
  transition: padding 0.3s;
  @media screen and (min-width: 500px) {
    padding: 20px;
  }
  @media screen and (min-width: 768px) {
    padding: 50px 20px;
  }
  @media screen and (min-width: 992px) {
    padding: 100px 20px;
  }
`;

function App() {
  return (
    <div className='App'>
      <GlobalStyle />
      <AppLayout>
        <Header/>
        <TodoContextProvider>
          <ToggleProvider>
            <Todo/>
          </ToggleProvider>
          <AddButton />
        </TodoContextProvider>
      </AppLayout>
    </div>
  );
}

export default App;
