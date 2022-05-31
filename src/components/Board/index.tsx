import { useEffect } from 'react';
import { Column } from './components/Column';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { fetchBoard } from '../../store/action-creators/board';
import { useActions } from '../../hooks/useActions';
import { Box, CircularProgress } from '@mui/material';
import styles from './index.module.scss';
import { ColumnModal } from './components/Modal';

export const Board = () => {
  const { columns, loading, error } = useTypedSelector((state) => state.board);
  const { idBoard } = useTypedSelector((state) => state.main);
  const { fetchBoard } = useActions();

  useEffect(() => {
    fetchBoard(idBoard === '' ? localStorage.getItem('idBoard')! : idBoard);
  }, []);

  if (loading) {
    return (
      <div
        style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Box className={styles.board}>
      {columns.map((column) => (
        <Column key={column.id} id={column.id} title={column.title} tasks={column.tasks} />
      ))}
      <Box>
        <ColumnModal />
      </Box>
    </Box>
  );
};

export default Board;
