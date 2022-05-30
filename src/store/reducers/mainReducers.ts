import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteBoard, getBoards, setNewBoard } from '../../utils/api/mainPageFetch/mainPageFetch';
import { Board, BoardItem, MainReducersState } from '../../utils/types/MainPage.ts';

export const initialState: MainReducersState = {
  openModal: false,
  idBoard: '',
  boards: [],
  isLoading: false,
  activeModal: '',
  status: null,
  error: null,
};

const setRejected = (state: MainReducersState, action: PayloadAction<string>) => {
  state.isLoading = false;
  state.error = action.payload;
};

const setPending = (state: MainReducersState) => {
  state.isLoading = true;
  state.error = null;
  state.status = null;
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setOpenModal(state) {
      state.openModal = !state.openModal;
    },
    setIdBoard(state, action: PayloadAction<string>) {
      state.idBoard = action.payload;
    },
    setActiveModal(state, action: PayloadAction<string>) {
      state.activeModal = action.payload;
    },
  },
  extraReducers: {
    [getBoards.fulfilled.type]: (state, action: PayloadAction<Board[]>) => {
      state.isLoading = false;
      state.boards = action.payload;
    },
    [getBoards.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getBoards.rejected.type]: setRejected,
    [setNewBoard.fulfilled.type]: (state, action: PayloadAction<BoardItem>) => {
      state.isLoading = false;
      state.status = 'Board created';
    },
    [setNewBoard.pending.type]: setPending,
    [setNewBoard.rejected.type]: setRejected,
    [deleteBoard.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.status = 'Board deleted';
    },
    [deleteBoard.pending.type]: setPending,
    [deleteBoard.rejected.type]: setRejected,
  },
});

export default mainSlice.reducer;
