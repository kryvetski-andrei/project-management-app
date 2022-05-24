import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { boardReducer } from './boardReducer';

export const rootReducer = combineReducers({
  board: boardReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
