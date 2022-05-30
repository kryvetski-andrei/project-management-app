import type { CSSProperties, FC } from 'react';
import { memo, useState, useRef, useCallback, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useTypedSelector } from '../../../../../../hooks/useTypeSelector';
import { batch, useDispatch, useSelector } from 'react-redux';
import update from 'immutability-helper';
import { BoardActionTypes } from '../../../../../../utils/types/Board';
import { ItemTypes } from '../../../../../../utils/types/DnDItems';
import { ITask } from '../../../../../../utils/types/Task';
import styles from './index.module.scss';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import { TaskMenu } from './components/Menu';
import { temporaryBoardIdPath } from '../../../../../../utils/api/config';

const style: CSSProperties = {
  // border: '1px dashed gray',
  cursor: 'grab',
};

// export interface Task {
//   columnId: number;
//   id: number;
//   title: string;
// }

export interface TaskProps {
  columnId: string;
  id: string;
  title: string;
  description: string;
}

interface Item {
  columnId: string;
  id: string;
  height: number;
}

export const Task: FC<TaskProps> = ({ columnId, id, title, description }) => {
  const { columns, loading, error, currentTask } = useTypedSelector((state) => state.board);
  const dispatch = useDispatch();

  const [grabbedTask, setGrabbedTask] = useState<{
    task: ITask;
    taskIndex: number;
    columnIndex: number;
  } | null>(null);
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

  const findTask = useCallback(
    (taskId: string, columnId: string) => {
      const column = columns.filter((c) =>
        c.tasks.includes(c.tasks.filter((t) => `${t.id}` === taskId)[0])
      )[0];
      const task = column.tasks.filter((t) => `${t.id}` === taskId)[0];

      return {
        task,
        taskIndex: column.tasks.indexOf(task),
        column,
        columnIndex: columns.indexOf(column),
      };
    },
    [columns]
  );

  const removeTask = useCallback(
    (columnId: string, taskId: string) => {
      const { taskIndex, columnIndex, task } = findTask(taskId, columnId);

      dispatch({
        type: BoardActionTypes.UPDATE_COLUMNS,
        payload: update(columns, { [columnIndex]: { tasks: { $splice: [[taskIndex, 1]] } } }),
      });
    },
    [columns]
  );

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.TASK,
      item: { columnId, id, height },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        size: monitor.getItem(),
      }),
      end: (item, monitor) => {
        const { id: droppedId } = item;
        setOpacity(1);

        if (!monitor.didDrop()) {
          returnTask();
        }
      },
    }),
    [height, columns]
  );

  const returnTask = useCallback(() => {
    dispatch({
      type: BoardActionTypes.UPDATE_COLUMNS,
      payload: columns,
    });
  }, [columns]);

  useEffect(() => {
    if (isDragging) {
      removeTask(columnId, id);
    }

    return () => {
      const { taskIndex, columnIndex, task } = findTask(id, columnId);

      dispatch({
        type: BoardActionTypes.ADD_CURRENT_TASK,
        payload: {
          task: task,
          taskIndex: taskIndex,
          columnIndex: columnIndex,
        },
      });
    };
  }, [isDragging]);

  return (
    <div ref={(node) => drag(node)} style={{ ...style, opacity }}>
      <div ref={measuredRef}>
        <Card sx={{ maxWidth: 345 }}>
          {/*<CardMedia*/}
          {/*    component="img"*/}
          {/*    height="140"*/}
          {/*    image="/static/images/cards/contemplative-reptile.jpg"*/}
          {/*    alt="green iguana"*/}
          {/*/>*/}
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography gutterBottom variant="h6" component="div">
                {title}
              </Typography>
              <TaskMenu boardId={temporaryBoardIdPath} columnId={columnId} taskId={id} />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </Card>
        {/*{title}*/}
        {/*<p>{description}</p>*/}
      </div>
    </div>
  );
};
