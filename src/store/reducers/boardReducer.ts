import { BoardActionTypes, IBoardAction, IBoardState } from '../../utils/types/Board';

const defaultState: IBoardState = {
  columns: [],
  loading: false,
  error: null,
  currentTask: null,
};

export const boardReducer = (state = defaultState, action: IBoardAction): IBoardState => {
  switch (action.type) {
    case BoardActionTypes.FETCH_BOARD:
      return { ...state, columns: [], loading: true, error: null };
    case BoardActionTypes.FETCH_BOARD_SUCCESS:
      return { ...state, columns: action.payload, loading: false, error: null };
    case BoardActionTypes.FETCH_BOARD_ERROR:
      return { ...state, columns: [], loading: false, error: action.payload };
    case BoardActionTypes.UPDATE_COLUMNS:
      return { ...state, columns: action.payload };
    case BoardActionTypes.ADD_CURRENT_TASK:
      return { ...state, currentTask: action.payload ?? null };
    default:
      return state;
  }
};
