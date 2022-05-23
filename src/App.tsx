import AppRouter from './components/AppRoute';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <AppRouter />
      <Footer />
    </DndProvider>
  );
}

export default App;
