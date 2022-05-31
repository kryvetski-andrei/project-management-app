import { Dispatch } from 'redux';
import { MainAction, MainActionTypes } from '../../utils/types/MainPage.ts';

export const deleteBoard = (id: string) => {
  return async (dispatch: Dispatch<MainAction>) => {
    try {
      dispatch({ type: MainActionTypes.DELETE_BOARDS });
      const response = await fetch(`https://kryvetski-be.herokuapp.com/boards/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error(`${response.statusText}. Can't delete board!`);
      }
      dispatch({ type: MainActionTypes.DELETE_BOARD_SUCCESS, payload: id });
      return id;
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: MainActionTypes.DELETE_BOARD_ERROR, payload: error.message });
      }
    }
  };
};
