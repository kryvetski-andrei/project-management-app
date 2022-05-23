import { BoardActionTypes, IBoardAction, IBoardState } from '../../utils/types/Board';

const defaultState: IBoardState = {
  columns: [
    {
      id: 1,
      title: 'TO DO',
      tasks: [
        {
          columnId: 1,
          id: 1,
          title:
            'Поестьnode.getBo undingClient Rect().heigh nodehtnode.g etBoundingClie ntRect().height node.getBoundi ngClientR ect().heig htnode.g etBoundin gClientRect().heightnode.getBoundingClientRect().heightn ode.getB oundingCli entRect().he ightnode. getBoundingClientRect().height',
        },
        {
          columnId: 1,
          id: 2,
          title: 'Поспать',
        },
        {
          columnId: 1,
          id: 3,
          title: 'Покурить',
        },
      ],
    },
    {
      id: 2,
      title: 'IN PROGRESS',
      tasks: [
        {
          columnId: 2,
          id: 4,
          title: 'Сходить в зал',
        },
        {
          columnId: 2,
          id: 5,
          title: 'Сходить в магазин',
        },
        {
          columnId: 2,
          id: 6,
          title: 'Сходить погулять',
        },
      ],
    },
    {
      id: 3,
      title: 'DONE',
      tasks: [
        {
          columnId: 3,
          id: 7,
          title: 'Поиграть в игру',
        },
        {
          columnId: 3,
          id: 8,
          title: 'Посмотреть фильм',
        },
        {
          columnId: 3,
          id: 9,
          title: 'Приготовить поесть',
        },
      ],
    },
  ],
  currentTask: null,
};

export const boardReducer = (state = defaultState, action: IBoardAction): IBoardState => {
  switch (action.type) {
    case BoardActionTypes.UPDATE_COLUMNS:
      return { ...state, columns: [...(action.payload ?? [])] };
    case BoardActionTypes.ADD_CURRENT_TASK:
      return { ...state, currentTask: action.payload ?? null };
    default:
      return state;
  }
};
