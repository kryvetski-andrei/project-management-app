import { Dispatch } from 'redux';
import { MainAction, MainActionTypes } from '../../utils/types/MainPage.ts';

export const getBoards = () => {
  return async (dispatch: Dispatch<MainAction>) => {
    try {
      dispatch({ type: MainActionTypes.GET_BOARDS });
      const response = await fetch('https://kryvetski-be.herokuapp.com/boards', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const result = await response.json();
      dispatch({ type: MainActionTypes.GET_BOARDS_SUCCESS, payload: result });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: MainActionTypes.GET_BOARDS_ERROR, payload: error.message });
      }
    }
  };
};
