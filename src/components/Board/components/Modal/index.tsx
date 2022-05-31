import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from '../../index.module.scss';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { BASE_URL } from '../../../../utils/api/config';
import update from 'immutability-helper';
import { useTypedSelector } from '../../../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { BoardActionTypes } from '../../../../utils/types/Board';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'background.paper',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  boxShadow: 24,
  p: 4,
};

function SaveIcon() {
  return null;
}

export const ColumnModal = () => {
  const { columns } = useTypedSelector((state) => state.board);
  const { token, userId } = useTypedSelector((state) => state.auth);
  const { idBoard } = useTypedSelector((state) => state.main);
  const {
    delete: deleteSome,
    addTask,
    createColumn,
    confirmationText,
    deleteThisColumn,
    deleteThisTask,
    editTask,
  } = useTypedSelector((state) => state.lang.phrases.board);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/boards/${idBoard === '' ? localStorage.getItem('idBoard')! : idBoard}/columns`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: value,
          }),
        }
      );
      const column = await response.json();
      const updatedColumn = {
        id: column.id,
        title: column.title,
        order: columns.length,
        tasks: [],
      };
      dispatch({
        type: BoardActionTypes.UPDATE_COLUMNS,
        payload: update(columns, {
          $splice: [[columns.length, 0, updatedColumn]],
        }),
      });
    } catch (e) {}

    setLoading(false);

    setTimeout(() => {
      handleClose();
    }, 500);
  };

  return (
    <div>
      <Button onClick={handleOpen} className={styles.addColumnButton}>
        <AddIcon />
        {createColumn}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {createColumn}
          </Typography>

          <Box
            component="form"
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Enter column name"
              variant="outlined"
              value={value}
              onChange={changeHandler}
            />
            <LoadingButton
              color="primary"
              onClick={handleClick}
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              {createColumn}
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
