import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { boardReducer } from './boardReducer';
import { columnReducer } from './columnReducer';
import { langReducer } from './langReducer';
import { mainReducer } from './mainReducers';

export const rootReducer = combineReducers({
  board: boardReducer,
  auth: authReducer,
  column: columnReducer,
  lang: langReducer,
  main: mainReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
