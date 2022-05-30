import { useCallback } from 'react';
import { IColumn } from '../../../utils/types/Column';

export const findColumnById = (columns: IColumn[], id: string) => {
  const column = columns.filter((c) => c.id === id)[0];
  return {
    column,
    index: columns.indexOf(column),
  };
};
