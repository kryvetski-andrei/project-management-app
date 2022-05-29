import { BoardActionTypes, IBoardAction } from '../../utils/types/Board';
import { Dispatch } from 'redux';
import { BASE_URL, temporaryToken } from '../../utils/api/config';
import { IColumn } from '../../utils/types/Column';

export const fetchBoard = (boardId: string) => {
  return async (dispatch: Dispatch<IBoardAction>) => {
    try {
      dispatch({ type: BoardActionTypes.FETCH_BOARD });

      const response = await fetch(`${BASE_URL}/boards/${boardId}/columns`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${temporaryToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      const columns = await Promise.all(
        data.map(async (column: IColumn) => {
          const response = await fetch(`${BASE_URL}/boards/${boardId}/columns/${column.id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${temporaryToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
          return await response.json();
        })
      );
      dispatch({
        type: BoardActionTypes.FETCH_BOARD_SUCCESS,
        payload: columns.sort((a, b) => a.order - b.order),
      });
    } catch (e) {
      dispatch({ type: BoardActionTypes.FETCH_BOARD_ERROR, payload: 'Can not download board' });
    }
  };
};
