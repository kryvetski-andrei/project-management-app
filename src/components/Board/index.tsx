import { memo, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { Column } from './components/Column';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { ItemTypes } from '../../utils/types/DnDItems';

const style = {
  display: 'flex',
  gap: 10,
};

export const Board = memo(function Board() {
  const columns = useTypedSelector((state) => state.board.columns);
  const dispatch = useDispatch();

  const findColumn = useCallback(
    (id: string) => {
      const column = columns.filter((c) => `${c.id}` === id)[0];

      return {
        column,
        index: columns.indexOf(column),
      };
    },
    [columns]
  );

  const moveColumn = useCallback(
    (id: string, atIndex: number) => {
      const { column, index } = findColumn(id);

      dispatch({
        type: 'UPDATE_COLUMNS',
        payload: update(columns, {
          $splice: [
            [index, 1],
            [atIndex, 0, column],
          ],
        }),
      });
    },
    [findColumn, columns]
  );

  const [, drop] = useDrop(() => ({ accept: ItemTypes.COLUMN }));
  return (
    <div ref={drop} style={style}>
      {columns.map((column) => (
        <Column
          key={column.id}
          id={`${column.id}`}
          title={column.title}
          tasks={column.tasks}
          moveColumn={moveColumn}
          findColumn={findColumn}
        />
      ))}
    </div>
  );
});

export default Board;
