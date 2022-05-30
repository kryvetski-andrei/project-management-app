import {
  AuthActionTypes,
  IAuthdAction,
  IAuthState,
  TOKEN_STORAGE_NAME,
} from '../../utils/types/authorization';

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
