import { ITask } from '../Task';

export interface IColumn {
  id: string;
  title: string;
  order: number;
  tasks: ITask[];
}

export interface IColumnState {
  columns: IColumn[];
  loading: boolean;
  error: string | null;
}

export enum ColumnActionTypes {
  FETCH_COLUMN = 'FETCH_COLUMN',
  FETCH_COLUMN_SUCCESS = 'FETCH_COLUMN_SUCCESS',
  FETCH_COLUMN_ERROR = 'FETCH_COLUMN_ERROR',
}

interface IActionFetchBoard {
  type: ColumnActionTypes.FETCH_COLUMN;
}

interface IActionFetchBoardSuccess {
  type: ColumnActionTypes.FETCH_COLUMN_SUCCESS;
  payload: IColumn;
}

interface IActionFetchBoardError {
  type: ColumnActionTypes.FETCH_COLUMN_ERROR;
  payload: string;
}

export type IColumnAction = IActionFetchBoard | IActionFetchBoardSuccess | IActionFetchBoardError;
