import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteUser, getUser, updateUser } from '../../utils/api/EditProfileFetch';
import { EditProfileState, UserData } from '../../utils/types/EditProfile';

export const initialState: EditProfileState = {
  openModal: false,
  user: {} as UserData,
  userId: '',
  isLoading: false,
  status: null,
  error: null,
};

const setRejected = (state: EditProfileState, action: PayloadAction<string>) => {
  state.isLoading = false;
  state.error = action.payload;
};

const setPending = (state: EditProfileState) => {
  state.isLoading = true;
  state.error = null;
  state.status = null;
};

export const editProfileSlice = createSlice({
  name: 'editProfile',
  initialState,
  reducers: {
    setOpenModal(state) {
      state.openModal = !state.openModal;
    },
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
  },
  extraReducers: {
    [getUser.fulfilled.type]: (state, action: PayloadAction<UserData>) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [getUser.pending.type]: (state) => {
      state.isLoading = true;
      state.error = null;
      state.status = null;
    },
    [getUser.rejected.type]: setRejected,
    [updateUser.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.status = 'User data updated';
    },
    [updateUser.pending.type]: setPending,
    [updateUser.rejected.type]: setRejected,
    [deleteUser.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.status = 'User deleted';
    },
    [deleteUser.pending.type]: setPending,
    [deleteUser.rejected.type]: setRejected,
  },
});

export default editProfileSlice.reducer;
