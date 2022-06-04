import { BoardActionTypes, IBoardAction } from '../../utils/types/Board';
import { Dispatch } from 'redux';
import { IColumn } from '../../utils/types/Column';
import ApiService from '../../utils/api/responses/board';

export const fetchBoard = (boardId: string) => {
  return async (dispatch: Dispatch<IBoardAction>) => {
    try {
      dispatch({ type: BoardActionTypes.FETCH_BOARD });

      const board = await ApiService.getBoard(boardId);
      const columns = await Promise.all(
        board.map(async (column: IColumn) => ApiService.getColumn(boardId, column.id))
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
