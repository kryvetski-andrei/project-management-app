import {
  AuthActionTypes,
  IAuthdAction,
  IAuthState,
  TOKEN_STORAGE_NAME,
} from '../../utils/types/authorization';

export function getUserIdFromToken(token: string | null): string | null {
  if (token !== null) {
    const payloadStr = token.split('.')[1];

    try {
      const payload = JSON.parse(atob(payloadStr));
      return payload.userId;
    } catch (e) {
      throw e;
    }
  }

  return null;
}

const defaultState: IAuthState = {
  token: localStorage.getItem(TOKEN_STORAGE_NAME),
  userId: getUserIdFromToken(localStorage.getItem(TOKEN_STORAGE_NAME)),
};

export const authReducer = (state = defaultState, action: IAuthdAction): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.UPDATE_TOKEN:
      return { ...state, token: action.payload };
    case AuthActionTypes.UPDATE_USER_ID:
      return { ...state, userId: action.payload };
    default:
      return state;
  }
};
