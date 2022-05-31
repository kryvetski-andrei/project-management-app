import { Button, Container } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import BoardList from '../../components/Main/components/BoardList';
import { Errors, NewBoard } from '../../utils/types/MainPage.ts';
import MessageHandler from '../../components/MessageHandler';
import ButtonWithPreloader from '../../components/ButtonWithPreloader';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { useActions } from '../../hooks/useActions';
import { useDispatch } from 'react-redux';
import CreateBoard from '../CreateBoard';

const Main = () => {
  const { idBoard, activeModal, openModal, isLoading, error, status } = useTypedSelector(
    (state) => state.main
  );
  const dispatch = useDispatch();
  const { setNewBoard, deleteBoard } = useActions();
  const [boardData, setboardData] = useState<NewBoard>({ title: '', description: '' });
  const [, setErrValidation] = useState<Errors>({});
  const [, setDisable] = useState<boolean>(true);
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

  const handleClik = () => {
    handleCloseModal();
    dispatch({
      type: 'SET_ACTIVE_MODAL',
      payload: 'create',
    });
  };

  const confirmBoardDelete = async () => {
    setOpen(true);
    deleteBoard(idBoard);
    setIsFetching(!isFetching);
    !isLoading && handleCloseModal();
  };
  return (
    <>
      <Container maxWidth="lg">
        <BoardList createBoard={handleClik} />
        {activeModal === 'create' && <CreateBoard />}
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
        {error && <MessageHandler open={open} setClose={setOpen} severity="error" text={error} />}
        {status && (
          <MessageHandler open={open} setClose={setOpen} severity="success" text={status} />
        )}
      </Container>
    </>
  );
};

export default Main;
