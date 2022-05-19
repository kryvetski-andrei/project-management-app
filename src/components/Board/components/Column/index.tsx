import type { CSSProperties, FC } from 'react';
import { memo, useCallback, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Task } from './components/Task';

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

export interface ColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  moveColumn: (id: string, to: number) => void;
  findColumn: (id: string) => { index: number };
  moveTask: (
    currentTask: { columnId: string; taskId: string },
    underTask: { columnId: string; taskId: string }
  ) => void;
  findTask: (
    taskId: string,
    columnId: string
  ) => { columnIndex: number; taskIndex: number; task: Task };
}

interface Item {
  id: string;
  originalIndex: number;
}

export const Column: FC<ColumnProps> = memo(function Column({
  id,
  title,
  tasks,
  moveColumn,
  findColumn,
  moveTask,
  findTask,
}) {
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
    [id, originalIndex, moveColumn]
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
    }),
    [findColumn, moveColumn]
  );

  const opacity = isDragging ? 0 : 1;
  return (
    <div ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
      {title}
      {tasks.map((task) => (
        <Task
          key={task.id}
          columnId={`${task.columnId}`}
          id={`${task.id}`}
          title={task.title}
          moveTask={moveTask}
        />
      ))}
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
// interface IColumn {
//   id: string;
//   title: string;
//   order: number;
// }
//
// interface ITasksColumn extends IColumn {
//   task: ITask;
// }
//
// const Column = (props: ITasksColumn) => {
//   const { id, title, order, task } = props;
//
//   return (
//     <ul>
//       <li>{task}</li>
//     </ul>
//   );
// };
//
// export default Column;
