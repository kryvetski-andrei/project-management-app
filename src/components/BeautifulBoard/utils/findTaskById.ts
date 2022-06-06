import { IColumn } from '../../../utils/types/Column';

export const findTask = (taskId: string, columnId: string, columns: IColumn[]) => {
  const column = columns.filter((c) =>
    c.tasks.includes(c.tasks.filter((t) => `${t.id}` === taskId)[0])
  )[0];
  const task = column.tasks.filter((t) => `${t.id}` === taskId)[0];

  return {
    task,
    taskIndex: column.tasks.indexOf(task),
    column,
    columnIndex: columns.indexOf(column),
  };
};
