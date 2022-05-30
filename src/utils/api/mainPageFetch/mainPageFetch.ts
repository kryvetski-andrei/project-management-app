import { NewBoard } from '../../types/MainPage.ts/index';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5YjAwOWYzOC1mNzI5LTRjZTEtYjk2Zi1iYjBmNDAyNDhlOTMiLCJsb2dpbiI6ImthdGUwMyIsImlhdCI6MTY1MzQyNDk4OX0.-kjmx6z1aGAPChnj3-CfFTCT3nftk9QXto4zWLzFyaI';

export const getBoards = createAsyncThunk('main/getBoards', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://kryvetski-be.herokuapp.com/boards', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Server Error!');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
  }
});

export const setNewBoard = createAsyncThunk(
  'main/setNewBoard',
  async (board: NewBoard, { rejectWithValue }) => {
    try {
      const response = await fetch('https://kryvetski-be.herokuapp.com/boards', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
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
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'main/deleteBoard',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://kryvetski-be.herokuapp.com/boards/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`${response.statusText}. Can't delete board!`);
      }
      return id;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);
