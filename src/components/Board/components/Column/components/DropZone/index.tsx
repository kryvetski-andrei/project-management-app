import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import classes from './index.module.scss';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { useTypedSelector } from '../../../../../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { Task } from '../Task';
import { ItemTypes } from '../../../../../../utils/types/DnDItems';

const style: CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'lightcyan',
  position: 'relative',
  cursor: 'move',
  transition: 'ease 0.15s',
};

interface Item {
  columnId: string;
  id: string;
  height: number;
}

const DropZone = (props: { id: number; columnId: number }) => {
  const columns = useTypedSelector((state) => state.board.columns);
  const currentTask = useTypedSelector((state) => state.board.currentTask);
  const dispatch = useDispatch();

  const [height, setHeight] = useState(10);
  const { id, columnId } = props;

  const hoverDropZone = useCallback(
    (height: number) => {
      setHeight(height);
    },
    [height]
  );

  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.TASK,
      item: { id },
      hover({ id: currentTaskId, columnId: currentColumnId, height: H }: Item, monitor) {
        const currentTask = {
          columnId: currentColumnId,
          taskId: currentTaskId,
          taskHeight: H,
        };

        setHeight(H);
      },

      drop({ id: bolowTaskId, columnId: belowColumnId }) {
        addTask(belowColumnId, bolowTaskId, columnId, id);
      },

      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver(),
        item: monitor.getItem(),
      }),
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

  const addTask = useCallback(
    (columnId: string, taskId: string, dropZoneColumnId: number, dropZoneId: number) => {
      const { columnIndex } = findTask(`${dropZoneId}`, `${dropZoneColumnId}`);
      const changeId = (task: Task) => {
        return update(task, { columnId: { $set: dropZoneColumnId } });
      };

      dispatch({
        type: 'UPDATE_COLUMNS',
        payload: update(columns, {
          [columnIndex]: { tasks: { $splice: [[dropZoneId, 0, changeId(currentTask!)]] } },
        }),
      });
    },
    []
  );

  const useLeave = (callback: () => void, isOver: boolean) => {
    const ref = useRef(isOver);

    useEffect(() => {
      if (ref.current && !isOver) {
        callback();
      }

      ref.current = isOver;
    }, [isOver]);
  };

  useLeave(() => setHeight(10), isOver);

  return <div ref={(node) => drop(node)} style={{ ...style, height }}></div>;
};

export default DropZone;
