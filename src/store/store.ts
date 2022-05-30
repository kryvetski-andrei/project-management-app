import { combineReducers, configureStore } from '@reduxjs/toolkit';
import editProfileReducer from './reducers/editProfileReducer';
import mainReducer from './reducers/mainReducers';
const rootReducer = combineReducers({
  mainReducer,
  editProfileReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
