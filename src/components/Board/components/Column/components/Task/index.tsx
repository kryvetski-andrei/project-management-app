import type { CSSProperties, FC } from 'react';
import { memo, useState, useRef, useCallback, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useTypedSelector } from '../../../../../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import update from 'immutability-helper';
import { BoardActionTypes } from '../../../../../../utils/types/Board';
import { ItemTypes } from '../../../../../../utils/types/DnDItems';

const style: CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  margin: '5px 0',
  cursor: 'move',
};

export interface Task {
  columnId: number;
  id: number;
  title: string;
}

export interface TaskProps {
  columnId: string;
  id: string;
  title: string;
}

interface Item {
  columnId: string;
  id: string;
  height: number;
}

export const Task: FC<TaskProps> = memo(function Task({ columnId, id, title }) {
  const columns = useTypedSelector((state) => state.board.columns);
  const currentTask = useTypedSelector((state) => state.board.currentTask);
  const dispatch = useDispatch();

  const [opacity, setOpacity] = useState(1);
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(
    (node) => {
      if (node !== null) {
        setHeight(node.getBoundingClientRect().height);
        return drag(node);
      }
    },
    [height]
  );

  const [{ isDragging, canDrag }, drag] = useDrag(
    () => ({
      type: ItemTypes.TASK,
      item: { columnId, id, height },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        canDrag: monitor.canDrag(),
        size: monitor.getItem(),
      }),
      end: (item, monitor) => {
        const { id: droppedId } = item;
        const didDrop = monitor.didDrop();
        setOpacity(1);

        if (!didDrop) {
          console.log(monitor.getItem(), 'item');
        }
      },
    }),
    [height]
  );

  const findTask = useCallback((taskId: string, columnId: string) => {
    const column = columns.filter((c) => `${c.id}` === columnId)[0];
    const task = column.tasks.filter((t) => `${t.id}` === taskId)[0];
    return {
      task,
      taskIndex: column.tasks.indexOf(task),
      column,
      columnIndex: columns.indexOf(column),
    };
  }, []);

  const removeTask = useCallback((columnId: string, taskId: string) => {
    const { taskIndex, columnIndex, task } = findTask(taskId, columnId);

    dispatch({
      type: BoardActionTypes.ADD_CURRENT_TASK,
      payload: task,
    });

    dispatch({
      type: BoardActionTypes.UPDATE_COLUMNS,
      payload: update(columns, { [columnIndex]: { tasks: { $splice: [[taskIndex, 1]] } } }),
    });
  }, []);

  useEffect(() => {
    if (isDragging) {
      removeTask(columnId, id);
    }
  });

  return (
    <div ref={(node) => drag(node)} style={{ ...style, opacity }}>
      <div ref={measuredRef}>{title}</div>
    </div>
  );
});
