import { Dispatch } from 'redux';
import { MainAction, MainActionTypes, NewBoard } from '../../utils/types/MainPage.ts';

export const setNewBoard = (board: NewBoard) => {
  return async (dispatch: Dispatch<MainAction>) => {
    try {
      dispatch({ type: MainActionTypes.SET_BOARDS });
      const response = await fetch('https://kryvetski-be.herokuapp.com/boards', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(board),
      });
      if (!response.ok) throw new Error(`${response.statusText}. Can't create board!`);
      else {
        const result = await response.json();
        dispatch({ type: MainActionTypes.SET_NEW_BOARD_SUCCESS });
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: MainActionTypes.SET_NEW_BOARD_ERROR, payload: error.message });
      }
    }
  };
};
