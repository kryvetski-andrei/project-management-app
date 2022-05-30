import {
  AuthActionTypes,
  IAuthdAction,
  IAuthState,
  TOKEN_STORAGE_NAME,
} from '../../utils/types/authorization';

export function getUserIdFromToken(token: string): string | null {
  const payloadStr = token.split('.')[1];

  try {
    const payload = JSON.parse(atob(payloadStr));

    return payload.userId;
  } catch (e) {}
  return null;
}

const defaultState: IAuthState = {
  token: localStorage.getItem(TOKEN_STORAGE_NAME),
  userId: null,
};

export const authReducer = (state = defaultState, action: IAuthdAction): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.UPDATE_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};
