import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { boardReducer } from './boardReducer';
import { columnReducer } from './columnReducer';
import { langReducer } from './langReducer';

export const rootReducer = combineReducers({
  board: boardReducer,
  auth: authReducer,
  column: columnReducer,
  lang: langReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
