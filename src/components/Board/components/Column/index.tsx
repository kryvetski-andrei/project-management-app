import type { CSSProperties, FC } from 'react';
import { memo, useCallback, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Task } from './components/Task';
import DropZone from './components/DropZone';

const ItemTypes = {
  COLUMN: 'column',
  TASK: 'task',
};

const style: CSSProperties = {
  border: '1px dashed gray',
  width: 400,
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

interface ITask {
  id: number;
  title: string;
}

interface IColum {
  id: number;
  title: string;
  tasks: ITask[];
}

type DropZone = {
  id: number;
};

type TaskList = ITask | DropZone;

const isTask = (item: TaskList): item is ITask => {
  return 'title' in item;
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
  const [taskHeight, setTaskHeight] = useState(0);

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

  const fillTasksWithDropZones = (tasks: Task[]) => {
    const dropZone = {
      id: 0,
    };
    let id = dropZone.id;
    return tasks.reduce(
      (tasksWithDropZones, task) => {
        tasksWithDropZones.push(task);
        tasksWithDropZones.push({ id: (id += 1) });
        return tasksWithDropZones;
      },
      [dropZone]
    );
  };

  const isTask = (item: TaskList): item is TaskList => {
    return 'title' in item;
  };

  const opacity = isDragging ? 0 : 1;
  return (
    <div ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
      {title}
      {fillTasksWithDropZones(tasks).map((task: DropZone | ITask, index) =>
        isTask(task) ? (
          <Task
            key={task.id}
            columnId={`${(task as Task).columnId}`}
            id={`${task.id}`}
            title={(task as Task).title}
            moveTask={moveTask}
            setTaskHeight={setTaskHeight}
          />
        ) : (
          <DropZone key={index + Date.now()} id={(task as DropZone).id} />
        )
      )}
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
