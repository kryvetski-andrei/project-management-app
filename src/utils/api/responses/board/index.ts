import { BASE_URL } from '../../config';
import { ITask } from '../../../types/Task';
import { getUserIdFromToken } from '../../../../store/reducers/authReducer';
import { IColumn } from '../../../types/Column';

const token = localStorage.getItem('token');

const getBoard = async (boardId: string) => {
  const response = await fetch(`${BASE_URL}/boards/${boardId}/columns`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
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
      Authorization: `Bearer ${token}`,
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
      Authorization: `Bearer ${token}`,
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
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateTask = async (task: ITask, columnId: string, newColumnId: string, index: number) => {
  const order = index + 1;
  const response = await fetch(
    `${BASE_URL}/boards/${localStorage.getItem('idBoard')!}/columns/${columnId}/tasks/${task.id}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: task.title,
        order: order,
        description: task.description,
        userId: getUserIdFromToken(token),
        boardId: localStorage.getItem('idBoard')!,
        columnId: newColumnId,
      }),
    }
  );

  return await response.json();
};

const updateColumn = async (column: IColumn, columnId: string, index: number) => {
  const order = index + 1;
  const response = await fetch(
    `${BASE_URL}/boards/${localStorage.getItem('idBoard')!}/columns/${columnId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: column.title,
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
  updateColumn,
  postColumn,
  deleteColumn,
};

export default ApiService;
