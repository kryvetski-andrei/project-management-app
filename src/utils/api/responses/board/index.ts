import { BASE_URL } from '../../config';
import { ITask } from '../../../types/Task';
import { getUserIdFromToken } from '../../../../store/reducers/authReducer';
import { IColumn } from '../../../types/Column';

const token = localStorage.getItem('token');

const getBoard = async (boardId: string) => {
  const response = await fetch(`${BASE_URL}/boards/${boardId}/columns`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')!}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

const getColumn = async (boardId: string, columnId: string) => {
  const response = await fetch(`${BASE_URL}/boards/${boardId}/columns/${columnId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')!}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

const postColumn = async (boardId: string, title: string) => {
  const response = await fetch(`${BASE_URL}/boards/${boardId}/columns`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')!}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
    }),
  });
  return await response.json();
};

const deleteColumn = async (boardId: string, columnId: string) => {
  await fetch(`${BASE_URL}/boards/${boardId}/columns/${columnId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')!}`,
    },
  });
};

const deleteTask = async (boardId: string, columnId: string, taskId: string) => {
  await fetch(`${BASE_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')!}`,
    },
  });
};

const postTask = async (columnId: string, task: { title: string; description: string }) => {
  const response = await fetch(
    `${BASE_URL}/boards/${localStorage.getItem('idBoard')!}/columns/${columnId}/tasks`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')!}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        userId: getUserIdFromToken(localStorage.getItem('token')!),
      }),
    }
  );
  return await response.json();
};

const updateTask = async (task: ITask, columnId: string, newColumnId: string, index: number) => {
  const order = index + 1;
  const response = await fetch(
    `${BASE_URL}/boards/${localStorage.getItem('idBoard')!}/columns/${columnId}/tasks/${task.id}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')!}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: task.title,
        order: order,
        description: task.description,
        userId: getUserIdFromToken(localStorage.getItem('token')!),
        boardId: localStorage.getItem('idBoard')!,
        columnId: newColumnId,
      }),
    }
  );

  return await response.json();
};

const updateColumn = async (title: string, columnId: string, index: number) => {
  const order = index + 1;
  const response = await fetch(
    `${BASE_URL}/boards/${localStorage.getItem('idBoard')!}/columns/${columnId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')!}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        order: order,
      }),
    }
  );

  return await response.json();
};

const ApiService = {
  getBoard,
  getColumn,
  updateTask,
  postTask,
  updateColumn,
  postColumn,
  deleteColumn,
  deleteTask,
};

export default ApiService;
