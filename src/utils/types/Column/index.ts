import { ITask } from '../Task';

export interface IColumn {
  id: number;
  title: string;
  tasks: ITask[];
}
