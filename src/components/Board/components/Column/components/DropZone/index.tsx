import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import classes from './index.module.scss';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { useTypedSelector } from '../../../../../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { Task } from '../Task';
import { ItemTypes } from '../../../../../../utils/types/DnDItems';
import { ITask } from '../../../../../../utils/types/Task';
import {
  BASE_URL,
  temporaryBoardIdPath,
  temporaryToken,
  temporaryUserId,
} from '../../../../../../utils/api/config';

const style: CSSProperties = {
  // border: '1px dashed gray',
  // backgroundColor: 'lightcyan',
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

  const [height, setHeight] = useState(20);
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
      const { column, columnIndex, taskIndex, task } = findTask(taskId, dropZoneColumnId);
      console.log(columnId);
      console.log(taskId);
      const updatedColumn = update(columns, {
        [columnIndex]: { tasks: { $splice: [[dropZoneId, 0, currentTask!.task]] } },
        //TODO change dropZoneId to dropZoneOrder or dropZoneIndex
      });
      dispatch({
        type: 'UPDATE_COLUMNS',
        payload: updatedColumn,
      });

      const sendTask = async (task: ITask) => {
        // const modyTask = {
        //   title: task.title,
        //   description: task.description,
        //   userId: temporaryUserId,
        // };
        // const response = await fetch(
        //   `${BASE_URL}/boards/${temporaryBoardIdPath}/columns/${dropZoneColumnId}/tasks`,
        //   {
        //     method: 'POST',
        //     headers: {
        //       Authorization: `Bearer ${temporaryToken}`,
        //       Accept: 'application/json',
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(modyTask),
        //   }
        // );

        const createdTask = {
          title: task.title,
          order: dropZoneId + 1,
          description: task.description,
          userId: temporaryUserId,
          boardId: temporaryBoardIdPath,
          columnId: columnId,
        };

        const expect = {
          title: 'jopa',
          order: 1,
          description: task.description,
          userId: 'f1ab4773-ecf5-4e4f-a7aa-43fdd87b5c98',
          boardId: '39add458-96f5-4416-9eaa-b36517c4527a',
          columnId: '69a0f823-0a32-40a8-8d87-db8bc2793768',
        };

        console.log(createdTask);
        console.log(expect);
        console.log(dropZoneId);
        const targetIndex = dropZoneId + 1;

        const response = await fetch(
          `${BASE_URL}/boards/${temporaryBoardIdPath}/columns/${columnId}/tasks/${task.id}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${temporaryToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: task.title,
              order: targetIndex,
              description: task.description,
              userId: temporaryUserId,
              boardId: temporaryBoardIdPath,
              columnId: dropZoneColumnId,
            }),
          }
        );

        return await response.json();
        console.log('succes');
        // const createdTask = await response.json();
        // console.log(createdTask, 'created tasl');
        // console.log(
        //   {
        //     title: createdTask.title,
        //     order: dropZoneId + 1,
        //     description: createdTask.description,
        //     userId: temporaryBoardIdPath,
        //     boardId: temporaryBoardIdPath,
        //     columnId: dropZoneColumnId,
        //   },
        //   'updated created task'
        // );
        // await fetch(
        //   `${BASE_URL}/boards/${temporaryBoardIdPath}/columns/${dropZoneColumnId}/tasks/${createdTask.id}`,
        //   {
        //     method: 'PUT',
        //     headers: {
        //       Authorization: `Bearer ${temporaryToken}`,
        //       Accept: 'application/json',
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //       title: createdTask.title,
        //       order: dropZoneId + 1,
        //       description: createdTask.description,
        //       userId: temporaryBoardIdPath,
        //       boardId: temporaryBoardIdPath,
        //       columnId: dropZoneColumnId,
        //     }),
        //   }
        // );

        // dispatch({
        //   type: 'UPDATE_COLUMNS',
        //   payload: update(updatedColumn, {
        //     [columnIndex]: { tasks: { [dropZoneId]: { id: { $set: createdTask.id } } } },
        //     //TODO change dropZoneId to dropZoneOrder or dropZoneIndex
        //   }),
        // });

        // console.log(createdTask);
        // return createdTask;
      };

      // const deleteTask = async (task: ITask) => {
      //   console.log(task.id, 'task id');
      //   await fetch(
      //     `${BASE_URL}/boards/${temporaryBoardIdPath}/columns/${columnId}/tasks/${task.id}`,
      //     {
      //       method: 'DELETE',
      //       headers: {
      //         Authorization: `Bearer ${temporaryToken}`,
      //       },
      //     }
      //   );
      // };

      sendTask(currentTask!.task);
      // deleteTask(currentTask!.task);
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
