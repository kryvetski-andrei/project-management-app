import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserUpdate } from '../../types/EditProfile';
// import { token } from '../mainPageFetch/mainPageFetch';

export const getUser = createAsyncThunk(
  'editProfile/getUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://kryvetski-be.herokuapp.com/users/${id}`, {
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
      return result;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  'editProfile/updateUser',
  async ({ user, id }: { user: UserUpdate; id: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://kryvetski-be.herokuapp.com/users/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
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

export const deleteUser = createAsyncThunk(
  'main/deleteUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://kryvetski-be.herokuapp.com/users/${id}`, {
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
        return rejectWithValue(error.message);
      }
    }
  }
);
