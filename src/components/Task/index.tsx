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

const Task = (props: ITask) => {
  const { id, title, order, description, userId, boardId, columnId } = props;

  return (
    <div>
      <h4>{title}</h4>
      <p>{description}</p>
      <button>Edit</button>
    </div>
  );
};

export default Task;
