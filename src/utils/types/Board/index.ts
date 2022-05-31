import { ITask } from '../Task';
import { IColumn } from '../Column';

export interface IBoard {
  id: string;
  title: string;
  description: string;
}

export interface IBoardState {
  columns: IColumn[];
  loading: boolean;
  error: string | null;
  currentTask: {
    task: ITask;
    taskIndex: number;
    columnIndex: number;
  } | null;
}

export enum BoardActionTypes {
  FETCH_BOARD = 'FETCH_BOARD',
  FETCH_BOARD_SUCCESS = 'FETCH_BOARD_SUCCESS',
  FETCH_BOARD_ERROR = 'FETCH_BOARD_ERROR',
  UPDATE_COLUMNS = 'UPDATE_COLUMNS',
  ADD_CURRENT_TASK = 'ADD_CURRENT_TASK',
}

interface IActionFetchBoard {
  type: BoardActionTypes.FETCH_BOARD;
}

interface IActionFetchBoardSuccess {
  type: BoardActionTypes.FETCH_BOARD_SUCCESS;
  payload: IColumn[];
}

interface IActionFetchBoardError {
  type: BoardActionTypes.FETCH_BOARD_ERROR;
  payload: string;
}

interface IActionUpdateColumns {
  type: BoardActionTypes.UPDATE_COLUMNS;
  payload: IColumn[];
}

interface IActionAddTask {
  type: BoardActionTypes.ADD_CURRENT_TASK;
  payload: {
    task: ITask;
    taskIndex: number;
    columnIndex: number;
  };
}

export type IBoardAction =
  | IActionFetchBoard
  | IActionFetchBoardSuccess
  | IActionFetchBoardError
  | IActionUpdateColumns
  | IActionAddTask;
