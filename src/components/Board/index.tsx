import { memo, useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';

import { Task } from './components/Column/components/Task';
import { Column } from './components/Column';

const ItemTypes = {
  COLUMN: 'column',
  TASK: 'task',
};

const style = {
  width: 400,
};

const ITEMS = [
  {
    id: 1,
    title: 'TO DO',
    tasks: [
      {
        columnId: 1,
        id: 1,
        title: 'Поесть',
      },
      {
        columnId: 1,
        id: 2,
        title: 'Поспать',
      },
      {
        columnId: 1,
        id: 3,
        title: 'Покурить',
      },
    ],
  },
  {
    id: 2,
    title: 'IN PROGRESS',
    tasks: [
      {
        columnId: 2,
        id: 4,
        title: 'Сходить в зал',
      },
      {
        columnId: 2,
        id: 5,
        title: 'Сходить в магазин',
      },
      {
        columnId: 2,
        id: 6,
        title: 'Сходить погулять',
      },
    ],
  },
  {
    id: 3,
    title: 'DONE',
    tasks: [
      {
        columnId: 3,
        id: 7,
        title: 'Поиграть в игру',
      },
      {
        columnId: 3,
        id: 8,
        title: 'Посмотреть фильм',
      },
      {
        columnId: 3,
        id: 9,
        title: 'Приготовить поесть',
      },
    ],
  },
];

export const Board = memo(function Board() {
  const [columns, setColumn] = useState(ITEMS);
  const [task, setTask] = useState<Task | null>(null);

  const findColumn = useCallback(
    (id: string) => {
      const column = columns.filter((c) => `${c.id}` === id)[0] as {
        id: number;
        title: string;
        tasks: Task[];
      };
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
      setColumn(
        update(columns, {
          $splice: [
            [index, 1],
            [atIndex, 0, column],
          ],
        })
      );
    },
    [findColumn, columns, setColumn]
  );

  const findTask = useCallback(
    (taskId: string, columnId: string) => {
      const column = columns.filter((c) => `${c.id}` === columnId)[0];
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

  const moveTask = useCallback(
    (
      currentTask: { columnId: string; taskId: string },
      underTask: { columnId: string; taskId: string }
    ) => {
      const {
        columnIndex: currentColumnIndex,
        taskIndex: currentTaskIndex,
        task: draggedTask,
      } = findTask(currentTask.taskId, currentTask.columnId);
      const { columnIndex: underColumnIndex, taskIndex: underTaskIndex } = findTask(
        underTask.taskId,
        underTask.columnId
      );
      const columnsCopy = [...columns];
      const { task: takedTask } = findTask(currentTask.taskId, currentTask.columnId);

      if (currentTask.columnId === underTask.columnId) {
        columnsCopy[underColumnIndex].tasks.splice(currentTaskIndex, 1);
        columnsCopy[underColumnIndex].tasks.splice(underTaskIndex, 0, draggedTask);
      } else {
        if (columnsCopy[currentColumnIndex].tasks.includes(draggedTask)) {
          console.log(takedTask);

          const previousTaskIndex = columnsCopy[currentColumnIndex].tasks.indexOf(draggedTask);
          columnsCopy[currentColumnIndex].tasks.splice(previousTaskIndex, 1);
        } else {
        }
      }

      setColumn(columnsCopy);
      // console.log(currentTask, underTask);
      // const { columnIndex: columnIndexBelow, taskIndex: taskIndexBelow, task: taskBelow } = findTask(id, columnId)

      //

      //
      // if (columnIndexBelow === parentColumnIndex) {
      //   console.log('if')
      //   columnsCopy[parentColumnIndex].tasks.splice(draggedTaskIndex, 1);
      //   columnsCopy[parentColumnIndex].tasks.splice(taskIndexBelow, 0, draggedTask);
      // } else {
      //   if (columnsCopy[parentColumnIndex].tasks.includes(draggedTask)) {
      //     const lastIndex = columnsCopy[parentColumnIndex].tasks.indexOf(draggedTask);
      //     columnsCopy[parentColumnIndex].tasks.splice(lastIndex, 1);
      //     if (!columnsCopy[columnIndexBelow].tasks.includes(draggedTask)){
      //       const newParentIndex = columnIndexBelow;
      //       const draggedTaskCopy = JSON.parse(JSON.stringify(draggedTask));
      //       draggedTaskCopy.columnId = columnsCopy[columnIndexBelow].id
      //
      //       columnsCopy[newParentIndex].tasks.splice(taskIndexBelow, 1);
      //       columnsCopy[newParentIndex].tasks.splice(taskIndexBelow, 0, draggedTaskCopy);
      //       columnsCopy[newParentIndex].tasks.splice(taskIndexBelow, 0, taskBelow);
      //       // columnsCopy[columnIndexBelow].tasks.push(draggedTask);
      //     }
      //   }
      // }

      //
    },
    [findTask, columns, setColumn]
  );

  const [, drop] = useDrop(() => ({ accept: ItemTypes.COLUMN }));
  return (
    <div ref={drop} style={style}>
      {columns.map((column) => (
        <Column
          key={column.id}
          id={`${column.id}`}
          title={column.title}
          tasks={column.tasks}
          moveColumn={moveColumn}
          findColumn={findColumn}
          moveTask={moveTask}
          findTask={findTask}
        />
      ))}
    </div>
  );
});

export default Board;
