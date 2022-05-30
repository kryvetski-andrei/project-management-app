import { Backdrop, Box, Button, CircularProgress, Container, TextField } from '@mui/material';
import classes from './index.module.scss';
import React, { useState, useEffect, lazy } from 'react';
import Modal from '../../components/Modal';
import {
  deleteBoard,
  getBoards,
  setNewBoard,
  token,
} from '../../utils/api/mainPageFetch/mainPageFetch';
import BoardList from '../../components/Main/components/BoardList';
import { Errors, NewBoard } from '../../utils/types/MainPage.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { mainSlice } from '../../store/reducers/mainReducers';
import MessageHandler from '../../components/MessageHandler';
import ButtonWithPreloader from '../../components/ButtonWithPreloader';
import { ArrowRightAlt } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { parseToken } from '../../utils/common/common';

// const BoardList = lazy(() => import('../../components/BoardList'));
const Main = () => {
  const { idBoard, activeModal, openModal, isLoading, error, status } = useAppSelector(
    (state) => state.mainReducer
  );
  const { setOpenModal, setActiveModal } = mainSlice.actions;
  const dispatch = useAppDispatch();
  const [boardData, setboardData] = useState<NewBoard>({ title: '', description: '' });
  const [errValidation, setErrValidation] = useState<Errors>({});
  const [disable, setDisable] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    setErrValidation({});
  }, [openModal]);

  useEffect(() => {
    const userData = parseToken(token);
    localStorage.setItem('userId', userData.userId);
  }, []); //вынести в другой компонент, чтобы при загрузке сразу были данные

  const handleCloseModal = () => {
    dispatch(setOpenModal());
    setDisable(true);
  };

  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrValidation({});
    setDisable(false);
    const { value, id } = e.target;
    id === 'title' && setboardData({ ...boardData, title: value.trim() });
    id === 'description' && setboardData({ ...boardData, description: value.trim() });
  };

  const handleClik = () => {
    handleCloseModal();
    dispatch(setActiveModal('create'));
  };

  const validateForm = () => {
    if (boardData.title === '') errValidation.title = 'Enter title';
    if (boardData.title.length > 50) errValidation.title = 'No more than 50 characters';
    if (boardData.description === '') errValidation.description = 'Enter description';
    if (boardData.description.length > 50) errValidation.description = 'No more than 50 characters';
    setErrValidation(errValidation);
    if (Object.values(errValidation)) setDisable(true);
    if (Object.values(boardData).every((i) => '' !== i && i.length <= 50)) createBoard();
  };

  const createBoard = async () => {
    setOpen(true);
    await dispatch(setNewBoard(boardData));
    setboardData({ title: '', description: '' });
    setIsFetching(!isFetching);
    !isLoading && handleCloseModal();
  };

  const confirmBoardDelete = async () => {
    await dispatch(deleteBoard(idBoard));
    setIsFetching(!isFetching);
    setOpen(true);
    !isLoading && handleCloseModal();
  };

  // console.log(open);
  // console.log(error);
  // console.log(status);
  return (
    <>
      <Container maxWidth="lg">
        <h2 className={classes.title}>Board List</h2>
        <BoardList isFetching={isFetching} createBoard={handleClik} />
        {activeModal === 'create' && (
          <Modal
            open={openModal}
            onClose={() => dispatch(setOpenModal())}
            title={'Create a board'}
            buttonCancel={
              <Button onClick={handleCloseModal} variant="contained">
                Cancel
              </Button>
            }
            buttonAgree={
              <ButtonWithPreloader
                isLoading={isLoading}
                onClick={validateForm}
                disabled={disable}
                content={'Create'}
              />
            }
          >
            <TextField
              error={!!errValidation?.title}
              helperText={errValidation?.title}
              id="title"
              label="Board Title"
              type="text"
              fullWidth
              variant="outlined"
              sx={{ minHeight: '82px', marginTop: '8px' }}
              onChange={handleChangeField}
            />
            <TextField
              error={!!errValidation?.description}
              helperText={errValidation?.description}
              id="description"
              label="Description"
              multiline
              variant="outlined"
              fullWidth
              sx={{ minHeight: '82px' }}
              onChange={handleChangeField}
            />
          </Modal>
        )}
        {activeModal === 'delete' && (
          <Modal
            open={openModal}
            onClose={() => dispatch(setOpenModal())}
            title={'Delete a board'}
            content={'Are you sure you want to delete the board?'}
            buttonCancel={
              <Button onClick={handleCloseModal} variant="contained">
                Cancel
              </Button>
            }
            buttonAgree={
              <ButtonWithPreloader
                isLoading={isLoading}
                onClick={confirmBoardDelete}
                content={'Delete'}
              />
            }
          />
        )}
        <button className={classes.button} onClick={handleClik}>
          Create new board
        </button>
        {error && <MessageHandler open={open} setClose={setOpen} severity="error" text={error} />}
        {status && (
          <MessageHandler open={open} setClose={setOpen} severity="success" text={status} />
        )}
        <Link to={'/edit'} className={classes.link}>
          <button className={classes.button}>Edit profile</button>
        </Link>
      </Container>
      {/* <Backdrop
        open={isLoading}
        sx={{ color: '#ffffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" size={100} />
      </Backdrop> */}
    </>
  );
};

export default Main;
