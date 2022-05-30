export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  boardId: string;
  columnId: string;
  files: [];
}
