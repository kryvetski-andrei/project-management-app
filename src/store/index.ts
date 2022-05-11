import { configureStore } from '@reduxjs/toolkit';

const defaultState = {
  boards: [
    {
      id: 1,
      title: 'Сделать',
      items: [
        { id: 1, title: 'Пойти в магаз' },
        { id: 2, title: 'сыграть в доту' },
        { id: 3, title: 'Победить' },
      ],
    },
    {
      id: 2,
      title: 'Проверить',
      items: [
        { id: 4, title: 'холодильник' },
        { id: 5, title: 'мусор' },
        { id: 6, title: 'коммнуалку' },
      ],
    },
    {
      id: 3,
      title: 'Сделано',
      items: [
        { id: 7, title: 'поспать' },
        { id: 8, title: 'поесть' },
        { id: 9, title: 'Покурить' },
      ],
    },
  ],
};

type Item = { id: number; title: string };

interface IBoardState {
  id: number;
  title: string;
  items: Item[];
}

type Board = {
  id: number;
  title: string;
  items: Item[];
};

type DropZone = {
  id: number;
};

interface IAction {
  type: string;
  update?: Board[];
}

const reducer = (state = defaultState, action: IAction) => {
  switch (action.type) {
    case 'ADD_TASK_TO_BOARD':
      return { ...state, boards: [...(action.update ?? [])] };
    case 'REMOVE_TASK_FROM_BOARD':
      return { ...state, boards: [...(action.update ?? [])] };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: reducer,
});

export type RootState = ReturnType<typeof reducer>;
