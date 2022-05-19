import type { CSSProperties, FC } from 'react';
import { memo, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = {
  COLUMN: 'column',
  TASK: 'task',
};

const style: CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
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
  moveTask: (
    currentTask: { columnId: string; taskId: string },
    underTask: { columnId: string; taskId: string }
  ) => void;
}

interface Item {
  columnId: string;
  id: string;
  originalIndex: number;
}

export const Task: FC<TaskProps> = memo(function Task({ columnId, id, title, moveTask }) {
  const [opacity, setOpacity] = useState(1);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.TASK,
      item: { columnId, id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId } = item;
        const didDrop = monitor.didDrop();
        setOpacity(1);
        if (!didDrop) {
          console.log(droppedId);
          // moveTask(droppedId, originalIndex, originalColumnIndex, columnId)
        }
      },
    }),
    [id]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.TASK,
      hover({ id: currentTaskId, columnId: currentColumnId }: Item) {
        const underTask = {
          columnId: columnId,
          taskId: id,
        };

        const currentTask = {
          columnId: currentColumnId,
          taskId: currentTaskId,
        };

        // console.log('Dragged Task Id: ', draggedTaskId);
        // console.log('Parent Column Id: ', parentColumnId);
        // console.log('Task Id BELOW: ', id);
        // console.log('Column Id BELOW: ', columnId);
        if (currentTask.taskId !== id) {
          moveTask(currentTask, underTask);

          // console.log(columnIndexBelow, taskIndexBelow, taskBelow, parentColumnIndex, draggedTaskIndex, draggedTask)
          // const { index } = findColumn(columnId);
        } else {
          setOpacity(0);
        }
      },
    }),
    []
  );

  // const opacity = isDragging ? 1 : 1
  return (
    <div ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
      {title}
    </div>
  );
});

// import React from 'react';
//
// interface ITask {
//   id: string;
//   title: string;
//   order: number;
//   description: string;
//   userId: string;
//   boardId: string;
//   columnId: string;
// }
//
// const Task = (props: ITask) => {
//   const { id, title, order, description, userId, boardId, columnId } = props;
//
//   return (
//     <div>
//       <h4>{title}</h4>
//       <p>{description}</p>
//       <button>Edit</button>
//     </div>
//   );
// };
//
// export default Task;
