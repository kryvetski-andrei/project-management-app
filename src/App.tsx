import AppRouter from './components/AppRoute';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';

const store = setupStore();

function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <AppRouter />
      </DndProvider>
    </Provider>
  );
}

export default App;
