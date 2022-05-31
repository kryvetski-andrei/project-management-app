import { SERVER_ADDR } from '../../config';
import { IApiError } from '../../types/api';

interface IUpdateUserPayload {
  name: string;
  login: string;
  password: string;
}

interface IUserResponse {
  id: string;
  name: string;
  login: string;
}

export async function getUserById(token: string, id: string): Promise<IUserResponse | IApiError> {
  const resp = await fetch(`${SERVER_ADDR}/users/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  return resp.json();
}

export async function updateUser(
  token: string,
  id: string,
  payload: IUpdateUserPayload
): Promise<IUserResponse | IApiError> {
  const resp = await fetch(`${SERVER_ADDR}/users/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return resp.json();
}

export async function deleteUser(token: string, id: string): Promise<string | IApiError> {
  const resp = await fetch(`${SERVER_ADDR}/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  // TODO: move code to constants
  if (resp.status === 204) {
    return 'ok';
  }

  return resp.json();
}
