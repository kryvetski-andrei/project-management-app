import { BoardActionTypes, IBoardAction } from '../../utils/types/Board';
import { Dispatch } from 'redux';
import { BASE_URL, temporaryToken } from '../../utils/api/config';
import { ColumnActionTypes, IColumnAction } from '../../utils/types/Column';

export const fetchColumn = (boardId: string, columnId: string) => {
  return async (dispatch: Dispatch<IColumnAction>) => {
    try {
      dispatch({ type: ColumnActionTypes.FETCH_COLUMN });

      const response = await fetch(`${BASE_URL}/boards/${boardId}/columns/${columnId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${temporaryToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const column = await response.json();
      dispatch({ type: ColumnActionTypes.FETCH_COLUMN_SUCCESS, payload: column });
    } catch (e) {
      dispatch({ type: ColumnActionTypes.FETCH_COLUMN_ERROR, payload: 'Can not download column' });
    }
  };
};
