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

interface IBoard {
  id: string;
  title: string;
}

interface ITasksColumn extends IColumn {
  task: ITask;
}

interface IColumnsBoard extends IBoard {
  column: ITasksColumn;
}

const Board = (props: IColumnsBoard) => {
  const { id, title, column } = props;

  return (
    <ul>
      <li>{column}</li>
    </ul>
  );
};

export default Board;
