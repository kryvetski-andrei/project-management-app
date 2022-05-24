export const TOKEN_STORAGE_NAME = 'token';

export interface IAuthState {
  token: string | null;
}

export enum AuthActionTypes {
  UPDATE_TOKEN = 'UPDATE_TOKEN',
}

interface IActionUpdateToken {
  type: AuthActionTypes.UPDATE_TOKEN;
  payload: string | null;
}

export type IAuthdAction = IActionUpdateToken;
