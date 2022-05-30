import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { boardReducer } from './boardReducer';
import { langReducer } from './languageReducer';

export const rootReducer = combineReducers({
  board: boardReducer,
  auth: authReducer,
  lang: langReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
