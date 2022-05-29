import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import classes from './index.module.scss';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { useTypedSelector } from '../../../../../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { Task } from '../Task';
import { ItemTypes } from '../../../../../../utils/types/DnDItems';
import { ITask } from '../../../../../../utils/types/Task';
import { BASE_URL, temporaryBoardIdPath, temporaryToken } from '../../../../../../utils/api/config';

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

const DropZone = (props: { id: number; columnId: string }) => {
  const { columns, currentTask } = useTypedSelector((state) => state.board);
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
      const { column, columnIndex } = findTask(taskId, dropZoneColumnId);
      // const changeId = (task: ITask) => {
      //   return update(task, { columnId: { $set: dropZoneColumnId } });
      // };
      //
      dispatch({
        type: 'UPDATE_COLUMNS',
        payload: update(columns, {
          [columnIndex]: { tasks: { $splice: [[dropZoneId, 0, currentTask!.task]] } },
          //TODO change dropZoneId to dropZoneOrder or dropZoneIndex
        }),
      });

      const sendTask = async (task: ITask) => {
        const modyTask = {
          title: task.title,
          description: task.description,
          userId: 'ef04c85a-a95c-4a47-96f2-6ebe50645730',
        };
        const response = await fetch(
          `${BASE_URL}/boards/${temporaryBoardIdPath}/columns/${dropZoneColumnId}/tasks`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${temporaryToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(modyTask),
          }
        );
        return await response.json();
      };

      const deleteTask = async (task: ITask) => {
        await fetch(
          `${BASE_URL}/boards/${temporaryBoardIdPath}/columns/${columnId}/tasks/${task.id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${temporaryToken}`,
            },
          }
        );
      };

      sendTask(currentTask!.task);
      deleteTask(currentTask!.task);
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
