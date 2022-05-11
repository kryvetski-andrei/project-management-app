import { configureStore } from '@reduxjs/toolkit';

const defaultState = {
  columns: [
    {
      id: 1,
      title: 'Сделать',
      tasks: [
        { id: 1, title: 'Пойти в магаз' },
        { id: 2, title: 'сыграть в доту' },
        { id: 3, title: 'Победить' },
      ],
    },
    {
      id: 2,
      title: 'Проверить',
      tasks: [
        { id: 4, title: 'холодильник' },
        { id: 5, title: 'мусор' },
        { id: 6, title: 'коммнуалку' },
      ],
    },
    {
      id: 3,
      title: 'Сделано',
      tasks: [
        { id: 7, title: 'поспать' },
        { id: 8, title: 'поесть' },
        { id: 9, title: 'Покурить' },
      ],
    },
  ],
};

interface ITask {
  id: number;
  title: string;
}

interface IBoardState {
  id: number;
  title: string;
  tasks: ITask[];
}

type Board = {
  id: number;
  title: string;
  tasks: ITask[];
};

type DropZone = {
  id: number;
};

interface IAction {
  type: string;
  payload?: Board[];
}

const reducer = (state = defaultState, action: IAction) => {
  switch (action.type) {
    case 'ADD_TASK_TO_BOARD':
      return { ...state, columns: [...(action.payload ?? [])] };
    case 'REMOVE_TASK_FROM_BOARD':
      return { ...state, columns: [...(action.payload ?? [])] };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: reducer,
});

export type RootState = ReturnType<typeof reducer>;
