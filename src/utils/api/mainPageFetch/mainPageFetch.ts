import { Board } from '../../types/MainPage.ts/index';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5MzU2MGZmMi05ZDkxLTRhMjItOTY4MS01MmU3ZmU0ZTI0OGQiLCJsb2dpbiI6InJvdXJvdSIsImlhdCI6MTY1MzA3NTc3MH0.4VdpFxDzaUEbYu2f_6ugt4mDCn628zu7mub790LFbJU';

export const getBoards = async (setResult: React.Dispatch<React.SetStateAction<Board[]>>) => {
  try {
    const response = await fetch('https://kryvetski-rs-pma-be.herokuapp.com/boards', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    console.log(result);
    setResult(result);
  } catch (error) {
    console.log(error);
  }
};

export const setNewBoard = async (title: { [key: string]: string }) => {
  try {
    await fetch('https://kryvetski-rs-pma-be.herokuapp.com/boards', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(title),
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBoard = async (id: string) => {
  try {
    await fetch(`https://kryvetski-rs-pma-be.herokuapp.com/boards/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
