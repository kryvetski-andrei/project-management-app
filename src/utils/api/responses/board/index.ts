import { BASE_URL } from '../../config';

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
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

const ApiService = {
  getBoard,
  getColumn,
};

export default ApiService;
