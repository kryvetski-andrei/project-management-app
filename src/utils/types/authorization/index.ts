export const TOKEN_STORAGE_NAME = 'token';

export interface IAuthState {
  token: string | null;
  userId: string | null;
}

export enum AuthActionTypes {
  UPDATE_TOKEN = 'UPDATE_TOKEN',
  UPDATE_USER_ID = 'UPDATE_USER_ID',
}

interface IActionUpdateToken {
  type: AuthActionTypes.UPDATE_TOKEN;
  payload: string | null;
}

interface IActionUpdateUserId {
  type: AuthActionTypes.UPDATE_USER_ID;
  payload: string | null;
}

export type IAuthdAction = IActionUpdateToken | IActionUpdateUserId;
