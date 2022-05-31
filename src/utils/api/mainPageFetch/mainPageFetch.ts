import { MainAction, MainActionTypes, NewBoard } from '../../types/MainPage.ts/index';
import { Dispatch } from '@reduxjs/toolkit';

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
        return error.message;
      }
    }
  };
};

export const setNewBoard = async (board: NewBoard) => {
  try {
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
      return result;
    }
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
};

export const deleteBoard = async (id: string) => {
  try {
    const response = await fetch(`https://kryvetski-be.herokuapp.com/boards/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error(`${response.statusText}. Can't delete board!`);
    }
    return id;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
};
