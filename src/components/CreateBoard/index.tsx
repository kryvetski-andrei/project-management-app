import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { Errors, NewBoard } from '../../utils/types/MainPage.ts';
import ButtonWithPreloader from '../ButtonWithPreloader';
import Modal from '../Modal';

const CreateBoard = () => {
  const { openModal, isLoading } = useTypedSelector((state) => state.main);
  const dispatch = useDispatch();
  const { setNewBoard } = useActions();
  const [boardData, setboardData] = useState<NewBoard>({ title: '', description: '' });
  const [errValidation, setErrValidation] = useState<Errors>({});
  const [disable, setDisable] = useState<boolean>(true);
  const [, setOpen] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrValidation({});
    setDisable(false);
    const { value, id } = e.target;
    id === 'title' && setboardData({ ...boardData, title: value.trim() });
    id === 'description' && setboardData({ ...boardData, description: value.trim() });
  };
  const { modalCreateBordTitle, buttonCancel, buttonAgree } = useTypedSelector(
    (state) => state.lang.phrases.global
  );
  const handleCloseModal = () => {
    dispatch({
      type: 'SET_OPEN_MODAL',
    });
    setDisable(true);
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

  const createBoard = () => {
    setOpen(true);
    setNewBoard(boardData);
    setboardData({ title: '', description: '' });
    setIsFetching(!isFetching);
    !isLoading && handleCloseModal();
  };
  return (
    <Modal
      open={openModal}
      onClose={() => dispatch({ type: 'SET_OPEN_MODAL' })}
      title={modalCreateBordTitle}
      buttonCancel={
        <Button onClick={handleCloseModal} variant="contained">
          {buttonCancel}
        </Button>
      }
      buttonAgree={
        <ButtonWithPreloader
          isLoading={isLoading}
          onClick={validateForm}
          disabled={disable}
          content={buttonAgree}
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
  );
};

export default CreateBoard;
