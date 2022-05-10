import React from 'react';

interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

interface IColumn {
  id: string;
  title: string;
  order: number;
}

interface ITasksColumn extends IColumn {
  task: ITask;
}

const Column = (props: ITasksColumn) => {
  const { id, title, order, task } = props;

  return (
    <ul>
      <li>{task}</li>
    </ul>
  );
};

export default Column;
