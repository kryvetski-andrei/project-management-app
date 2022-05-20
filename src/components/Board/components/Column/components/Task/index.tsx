import type { CSSProperties, FC } from 'react';
import { memo, useState, useRef, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = {
  COLUMN: 'column',
  TASK: 'task',
};

const style: CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
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
  setTaskHeight: (taskHeight: number) => void;
}

interface Item {
  columnId: string;
  id: string;
  height: number;
}

export const Task: FC<TaskProps> = memo(function Task({
  columnId,
  id,
  title,
  moveTask,
  setTaskHeight,
}) {
  const [opacity, setOpacity] = useState(1);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(null);

  const measuredRef = useCallback(
    (node) => {
      if (node !== null) {
        setHeight(node.getBoundingClientRect().height);
        return drag(node);
      }
    },
    [height]
  );

  const [, drag] = useDrag(
    () => ({
      type: ItemTypes.TASK,
      item: { columnId, id, height },

      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        size: monitor.getItem(),
      }),
      end: (item, monitor) => {
        const { id: droppedId } = item;
        const didDrop = monitor.didDrop();
        setOpacity(1);
        if (!didDrop) {
          // console.log(monitor.getItem(), 'item');
          // moveTask(droppedId, originalIndex, originalColumnIndex, columnId)
        }
      },
    }),
    [height]
  );

  // const [, drop] = useDrop(
  //   () => ({
  //     accept: ItemTypes.TASK,
  //     hover({ id: currentTaskId, columnId: currentColumnId }: Item) {
  //       const underTask = {
  //         columnId: columnId,
  //         taskId: id,
  //       };
  //
  //       const currentTask = {
  //         columnId: currentColumnId,
  //         taskId: currentTaskId,
  //       };
  //
  //       // console.log('Dragged Task Id: ', draggedTaskId);
  //       // console.log('Parent Column Id: ', parentColumnId);
  //       // console.log('Task Id BELOW: ', id);
  //       // console.log('Column Id BELOW: ', columnId);
  //       if (currentTask.taskId !== id) {
  //         moveTask(currentTask, underTask);
  //
  //         // console.log(columnIndexBelow, taskIndexBelow, taskBelow, parentColumnIndex, draggedTaskIndex, draggedTask)
  //         // const { index } = findColumn(columnId);
  //       } else {
  //         setOpacity(0);
  //       }
  //     },
  //   }),
  //   []
  // );
  // console.log(height);
  // const opacity = isDragging ? 1 : 1
  return (
    <div ref={(node) => drag(node)} style={{ ...style, opacity }}>
      <div ref={measuredRef}>{title}</div>
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
