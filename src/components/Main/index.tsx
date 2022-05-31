import { Button, Container, TextField } from '@mui/material';
import classes from './index.module.scss';
import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import BoardList from '../../components/Main/components/BoardList';
import { Errors, NewBoard } from '../../utils/types/MainPage.ts';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import MessageHandler from '../../components/MessageHandler';
import ButtonWithPreloader from '../../components/ButtonWithPreloader';
import { Link } from 'react-router-dom';
import { parseToken } from '../../utils/common/common';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { useActions } from '../../hooks/useActions';

const Main = () => {
  const { idBoard, activeModal, openModal, isLoading, error, status } = useTypedSelector(
    (state) => state.main
  );
  const { setNewBoard, deleteBoard } = useActions();
  const dispatch = useAppDispatch();
  const [boardData, setboardData] = useState<NewBoard>({ title: '', description: '' });
  const [errValidation, setErrValidation] = useState<Errors>({});
  const [disable, setDisable] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    setErrValidation({});
  }, [openModal]);

  const handleCloseModal = () => {
    dispatch({
      type: 'SET_OPEN_MODAL',
    });
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
    dispatch({
      type: 'SET_ACTIVE_MODAL',
      payload: 'create',
    });
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
    await setNewBoard(boardData);
    setboardData({ title: '', description: '' });
    setIsFetching(!isFetching);
    !isLoading && handleCloseModal();
  };

  const confirmBoardDelete = async () => {
    await deleteBoard(idBoard);
    setIsFetching(!isFetching);
    setOpen(true);
    !isLoading && handleCloseModal();
  };
  return (
    <>
      <Container maxWidth="lg">
        <h2 className={classes.title}>Board List</h2>
        <BoardList isFetching={isFetching} createBoard={handleClik} />
        {activeModal === 'create' && (
          <Modal
            open={openModal}
            onClose={() => dispatch({ type: 'SET_OPEN_MODAL' })}
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
            onClose={() => dispatch({ type: 'SET_OPEN_MODAL' })}
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
      </Container>
    </>
  );
};

export default Main;

