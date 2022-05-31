export interface Board {
  id: string;
  title: string;
  description: string;
}

export interface MainReducersState {
  openModal: boolean;
  idBoard: string;
  boards: Board[];
  isLoading: boolean;
  activeModal: string;
  status: string | null;
  error: string | null;
  isFetching: boolean;
}

export interface NewBoard {
  title: string;
  description: string;
}

export interface BoardItem extends NewBoard {
  id: string;
}

export interface Errors {
  title?: string;
  description?: string;
}

export enum MainActionTypes {
  SET_OPEN_MODAL = 'SET_OPEN_MODAL',
  SET_ID_BOARD = 'SET_ID_BOARD',
  SET_ACTIVE_MODAL = 'SET_ACTIVE_MODAL',
  GET_BOARDS = 'GET_BOARDS',
  GET_BOARDS_SUCCESS = 'GET_BOARDS_SUCCESS',
  GET_BOARDS_ERROR = 'GET_BOARDS_ERROR',
  SET_BOARDS = 'GET_BOARDS',
  SET_NEW_BOARD_SUCCESS = 'SET_NEW_BOARD_SUCCESS',
  SET_NEW_BOARD_ERROR = 'SET_NEW_BOARD_ERROR',
  DELETE_BOARDS = 'DELETE_BOARDS',
  DELETE_BOARD_SUCCESS = 'DELETE_BOARD_SUCCESS',
  DELETE_BOARD_ERROR = 'DELETE_BOARD_ERROR',
}

interface ActionSetOpenModal {
  type: MainActionTypes.SET_OPEN_MODAL;
}

interface ActionSetIdBoard {
  type: MainActionTypes.SET_ID_BOARD;
  payload: string;
}

interface ActionSetActiveBoard {
  type: MainActionTypes.SET_ACTIVE_MODAL;
  payload: string;
}

interface ActionGetBoards {
  type: MainActionTypes.GET_BOARDS;
}

interface ActionGetBoardsSuccess {
  type: MainActionTypes.GET_BOARDS_SUCCESS;
  payload: Board[];
}

interface ActionGetBoardsError {
  type: MainActionTypes.GET_BOARDS_ERROR;
  payload: string;
}

interface ActionSetBoards {
  type: MainActionTypes.SET_BOARDS;
}
interface ActionSetNewBoardSuccess {
  type: MainActionTypes.SET_NEW_BOARD_SUCCESS;
  payload: BoardItem;
}

interface ActionSetNewBoardError {
  type: MainActionTypes.SET_NEW_BOARD_ERROR;
  payload: string;
}

interface ActionDeleteBoards {
  type: MainActionTypes.DELETE_BOARDS;
}

interface ActionDeleteNewBoardSuccess {
  type: MainActionTypes.DELETE_BOARD_SUCCESS;
  payload: string;
}

interface ActionDeleteNewBoardError {
  type: MainActionTypes.DELETE_BOARD_ERROR;
  payload: string;
}

export type MainAction =
  | ActionSetOpenModal
  | ActionSetIdBoard
  | ActionSetActiveBoard
  | ActionGetBoards
  | ActionGetBoardsSuccess
  | ActionGetBoardsError
  | ActionSetBoards
  | ActionSetNewBoardSuccess
  | ActionSetNewBoardError
  | ActionDeleteBoards
  | ActionDeleteNewBoardSuccess
  | ActionDeleteNewBoardError;
