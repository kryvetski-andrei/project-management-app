import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { boardReducer } from './boardReducer';
import { columnReducer } from './columnReducer';

export const rootReducer = combineReducers({
  board: boardReducer,
  auth: authReducer,
  column: columnReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
