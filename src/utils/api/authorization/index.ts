import { SERVER_ADDR } from '../../config';
import { IApiError } from '../../types/api';

export async function signin(
  login: string,
  password: string
): Promise<{ token: string } | IApiError> {
  const resp = await fetch(`${SERVER_ADDR}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login, password }),
  });

  return resp.json();
}

export async function signup(
  name: string,
  login: string,
  password: string
): Promise<{ id: string } | IApiError> {
  const resp = await fetch(`${SERVER_ADDR}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, login, password }),
  });

  return resp.json();
}
