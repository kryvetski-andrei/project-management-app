import { Button, Container, TextField } from '@mui/material';
import classes from './index.module.scss';
import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import { deleteBoard, getBoards, setNewBoard } from '../../utils/api/mainPageFetch/mainPageFetch';
import BoardList from '../../components/BoardList';
import { Board } from '../../utils/types/MainPage.ts';

const MainPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const [openModalConf, setOpenModalConf] = useState<boolean>(false);
  const [boards, setBoards] = useState<Board[]>([]);
  const [fieldValue, setFieldValue] = useState({ title: '' });

  useEffect(() => {
    getBoards(setBoards);
  }, []);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleOpenM = (e: React.UIEvent<HTMLButtonElement>) => {
    setOpenModalConf(true);
    const id = e.currentTarget.id;
    setId(id);
  };
  const handleCloseM = () => setOpenModalConf(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFieldValue({ title: value });
  };

  const confirmBoardDelete = async () => {
    await deleteBoard(id);
    getBoards(setBoards);
    handleCloseM();
  };

  const createBoard = async () => {
    await setNewBoard(fieldValue);
    handleClose();
    getBoards(setBoards);
  };

  return (
    <Container maxWidth="lg">
      <h2 className={classes.title}>Board List</h2>
      <BoardList boards={boards} onClick={handleOpenM}></BoardList>
      <Modal
        title={'Create a board'}
        content={'Enter board name'}
        open={open}
        handleClose={handleClose}
        buttonCancel={<Button onClick={handleClose}>Cancel</Button>}
        buttonAgree={<Button onClick={createBoard}>Create</Button>}
      >
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Board Title"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
      </Modal>
      <Modal
        title={'Delete a board'}
        content={'Are you sure you want to delete the board?'}
        open={openModalConf}
        handleClose={handleCloseM}
        buttonCancel={<Button onClick={handleCloseM}>Cancel</Button>}
        buttonAgree={<Button onClick={confirmBoardDelete}>Delete</Button>}
      ></Modal>
      <button className={classes.button} onClick={handleOpen}>
        Create new board
      </button>
    </Container>
  );
};

export default MainPage;
