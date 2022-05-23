import { ITask } from '../Task';
import { IColumn } from '../Column';

export interface IBoardState {
  columns: IColumn[];
  currentTask: ITask | null;
}

export enum BoardActionTypes {
  UPDATE_COLUMNS = 'UPDATE_COLUMNS',
  ADD_CURRENT_TASK = 'ADD_CURRENT_TASK',
}

export interface IActionUpdateColumns {
  type: BoardActionTypes.UPDATE_COLUMNS;
  payload: IColumn[];
}

export interface IActionAddTask {
  type: BoardActionTypes.ADD_CURRENT_TASK;
  payload: ITask | null;
}

export type IBoardAction = IActionUpdateColumns | IActionAddTask;
