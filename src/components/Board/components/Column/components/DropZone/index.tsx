import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { useTypedSelector } from '../../../../../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { ItemTypes } from '../../../../../../utils/types/DnDItems';
import { ITask } from '../../../../../../utils/types/Task';
import { BASE_URL } from '../../../../../../utils/api/config';
import { BoardActionTypes } from '../../../../../../utils/types/Board';

const style: CSSProperties = {
  position: 'relative',
  cursor: 'move',
  transition: 'ease 0.15s',
};

interface Item {
  columnId: string;
  id: string;
  height: number;
}

const DropZone = (props: { id: number; columnId: string }) => {
  const { columns, currentTask } = useTypedSelector((state) => state.board);
  const { idBoard } = useTypedSelector((state) => state.main);
  const { token, userId } = useTypedSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [height, setHeight] = useState(20);
  const { id, columnId } = props;

  const hoverDropZone = useCallback(
    (height: number) => {
      setHeight(height);
    },
    [height]
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.TASK,
      item: { id },
      hover({ height: H }: Item, monitor) {
        hoverDropZone(H + 40);
      },

      drop({ id: currentTaskId, columnId: currentColumnId }) {
        addTask(currentColumnId, currentTaskId, columnId, id);
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
    (columnId: string, taskId: string, dropZoneColumnId: string, dropZoneId: number) => {
      const { columnIndex } = findTask(taskId, dropZoneColumnId);
      const updatedColumn = update(columns, {
        [columnIndex]: { tasks: { $splice: [[dropZoneId, 0, currentTask!.task]] } },
      });

      dispatch({
        type: BoardActionTypes.UPDATE_COLUMNS,
        payload: updatedColumn,
      });

      const sendTask = async (task: ITask) => {
        const targetIndex = dropZoneId + 1;
        const response = await fetch(
          `${BASE_URL}/boards/${
            idBoard === '' ? localStorage.getItem('idBoard')! : idBoard
          }/columns/${columnId}/tasks/${task.id}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: task.title,
              order: targetIndex,
              description: task.description,
              userId: userId,
              boardId: idBoard === '' ? localStorage.getItem('idBoard')! : idBoard,
              columnId: dropZoneColumnId,
            }),
          }
        );

        return await response.json();
      };

      sendTask(currentTask!.task);
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

  useLeave(() => setHeight(20), isOver);

  return <div ref={(node) => drop(node)} style={{ ...style, height }}></div>;
};

export default DropZone;
