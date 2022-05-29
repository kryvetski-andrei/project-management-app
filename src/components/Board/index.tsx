import { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { Column } from './components/Column';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { ItemTypes } from '../../utils/types/DnDItems';
import { fetchBoard } from '../../store/action-creators/board';
import { useActions } from '../../hooks/useActions';
import { BASE_URL, temporaryBoardIdPath, temporaryToken } from '../../utils/api/config';

const style = {
  display: 'flex',
  gap: 10,
};

export const Board = () => {
  const { columns, loading, error } = useTypedSelector((state) => state.board);
  const { fetchBoard } = useActions();

  useEffect(() => {
    fetchBoard(temporaryBoardIdPath);
  }, []);

  // const [, drop] = useDrop(() => ({
  //   accept: ItemTypes.COLUMN,
  //   collect: (monitor) => ({
  //     isDrop: monitor.didDrop(),
  //   }),
  // }));

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div style={style}>
      {columns.map((column) => (
        <Column key={column.id} id={column.id} title={column.id} tasks={column.tasks} />
      ))}
    </div>
  );
};

export default Board;
