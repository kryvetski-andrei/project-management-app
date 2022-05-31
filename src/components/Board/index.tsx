import { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Column } from './components/Column';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { ItemTypes } from '../../utils/types/DnDItems';
import { fetchBoard } from '../../store/action-creators/board';
import { useActions } from '../../hooks/useActions';
import { BASE_URL, temporaryBoardIdPath, temporaryToken } from '../../utils/api/config';
import { Box, Button, CircularProgress } from '@mui/material';
import styles from './index.module.scss';
import AddIcon from '@mui/icons-material/Add';
import { ColumnModal } from './components/Modal';

export const Board = () => {
  const { columns, loading, error } = useTypedSelector((state) => state.board);
  const { idBoard } = useTypedSelector((state) => state.main);
  const { fetchBoard } = useActions();

  useEffect(() => {
    fetchBoard(idBoard);
  }, []);

  // const [, drop] = useDrop(() => ({
  //   accept: ItemTypes.COLUMN,
  //   collect: (monitor) => ({
  //     isDrop: monitor.didDrop(),
  //   }),
  // }));

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
        {/*<Button className={styles.addColumnButton}>*/}
        {/*  <AddIcon />*/}
        {/*  Create Column*/}
        {/*</Button>*/}
      </Box>
    </Box>
  );
};

export default Board;
