import { combineReducers } from 'redux';
import { boardReducer } from './boardReducer';
import { columnReducer } from './columnReducer';

export const rootReducer = combineReducers({
  board: boardReducer,
  column: columnReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
