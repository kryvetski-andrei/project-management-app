import { MainAction, MainActionTypes, MainReducersState } from '../../utils/types/MainPage.ts';

export const defaultState: MainReducersState = {
  openModal: false,
  idBoard: '',
  boards: [],
  isLoading: false,
  activeModal: '',
  status: null,
  error: null,
};

export const mainReducer = (state = defaultState, action: MainAction): MainReducersState => {
  switch (action.type) {
    case MainActionTypes.SET_OPEN_MODAL:
      return { ...state, openModal: !state.openModal };
    case MainActionTypes.SET_ID_BOARD:
      return { ...state, idBoard: action.payload };
    case MainActionTypes.SET_ACTIVE_MODAL:
      return { ...state, activeModal: action.payload };
    case MainActionTypes.GET_BOARDS:
      return { ...state, isLoading: true, error: null, status: null };
    case MainActionTypes.GET_BOARDS_SUCCESS:
      return { ...state, isLoading: false, boards: action.payload };
    case MainActionTypes.GET_BOARDS_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case MainActionTypes.SET_BOARDS:
      return { ...state, isLoading: true, error: null, status: null };
    case MainActionTypes.SET_NEW_BOARD_SUCCESS:
      return { ...state, isLoading: false, status: 'Board created' };
    case MainActionTypes.SET_NEW_BOARD_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case MainActionTypes.DELETE_BOARDS:
      return { ...state, isLoading: true, error: null, status: null };
    case MainActionTypes.DELETE_BOARD_SUCCESS:
      return { ...state, status: 'Board deleted' };
    case MainActionTypes.DELETE_BOARD_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
