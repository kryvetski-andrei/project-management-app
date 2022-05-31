import type { CSSProperties, FC } from 'react';
import { useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Task } from './components/Task';
import DropZone from './components/DropZone';
import { ITask } from '../../../../utils/types/Task';
import { useTypedSelector } from '../../../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { BASE_URL, temporaryBoardIdPath, temporaryToken } from '../../../../utils/api/config';
import update from 'immutability-helper';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ColumnMenu } from './components/Menu';
import styles from './index.module.scss';
import { BoardActionTypes } from '../../../../utils/types/Board';

const ItemTypes = {
  COLUMN: 'column',
  TASK: 'task',
};

const style: CSSProperties = {
  minWidth: '350px',
  backgroundColor: 'white',
  cursor: 'move',
  height: '100%',
  overflowY: 'hidden',
};

type DropZone = {
  dropZoneOrder: number;
};

type TaskList = ITask | DropZone;

const isTask = (item: TaskList): item is ITask => {
  return 'title' in item;
};

export interface ColumnProps {
  id: string;
  title: string;
  tasks: ITask[];
}

interface Item {
  id: string;
  originalIndex: number;
}

export const Column: FC<ColumnProps> = ({ id, title, tasks }) => {
  const { columns, loading, error } = useTypedSelector((state) => state.board);
  const { idBoard } = useTypedSelector((state) => state.main);
  const { token, userId } = useTypedSelector((state) => state.auth);
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
        type: BoardActionTypes.UPDATE_COLUMNS,
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

  const originalIndex = findColumn(id).index;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.COLUMN,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveColumn(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveColumn, tasks]
  );

  const sendColumn = useCallback(
    async (id: string, column: { title: string; order: number }) => {
      const response = await fetch(
        `${BASE_URL}/boards/${
          idBoard === '' ? localStorage.getItem('idBoard')! : idBoard
        }/columns/${id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(column),
        }
      );
      return await response.json();
    },
    [columns]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.COLUMN,
      hover({ id: draggedId }: Item) {
        if (draggedId !== id) {
          const { index: overIndex } = findColumn(id);
          moveColumn(draggedId, overIndex);
        }
      },
      drop({ id: draggedId }: Item) {
        const { index: overIndex } = findColumn(id);
        sendColumn(draggedId, { title: title, order: overIndex + 1 });
      },
    }),
    [findColumn, moveColumn, tasks]
  );

  const fillTasksWithDropZones = (tasks: ITask[]) => {
    const dropZone = {
      dropZoneOrder: 0,
    };

    let dropZoneOrder = dropZone.dropZoneOrder;

    return tasks.reduce<Array<DropZone | ITask>>(
      (tasksWithDropZones, task) => {
        tasksWithDropZones.push(task as ITask);
        tasksWithDropZones.push({ dropZoneOrder: (dropZoneOrder += 1) });
        return tasksWithDropZones;
      },
      [dropZone]
    );
  };

  const isTask = (item: TaskList): item is TaskList => {
    return 'title' in item;
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const opacity = isDragging ? 0 : 1;

  return (
    <div ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
      <Box className={styles.columnHeader}>
        <Typography>{title}</Typography>
        <ColumnMenu
          boardId={idBoard === '' ? localStorage.getItem('idBoard')! : idBoard}
          columnId={id}
        />
      </Box>
      <Box className={styles.tasksWrapper}>
        {fillTasksWithDropZones(tasks).map((task: DropZone | ITask, index) =>
          isTask(task) ? (
            <Task
              key={(task as ITask).id}
              columnId={id}
              id={`${(task as ITask).id}`}
              title={(task as ITask).title}
              description={(task as ITask).description}
            />
          ) : (
            <DropZone
              key={index + Date.now()}
              id={(task as DropZone).dropZoneOrder}
              columnId={id}
            />
          )
        )}
      </Box>
    </div>
  );
};
