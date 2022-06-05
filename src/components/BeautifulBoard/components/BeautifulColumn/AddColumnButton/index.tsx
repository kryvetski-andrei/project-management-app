import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../../../hooks/useTypeSelector';
import LoadingButton from '@mui/lab/LoadingButton';
import ApiService from '../../../../../utils/api/responses/board';
import { BoardActionTypes } from '../../../../../utils/types/Board';
import update from 'immutability-helper';
import AddIcon from '@mui/icons-material/Add';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AddColumnButton = () => {
  const dispatch = useDispatch();
  const { columns } = useTypedSelector((state) => state.board);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClick = async () => {
    setLoading(true);
    const newColumn = await ApiService.postColumn(localStorage.getItem('idBoard')!, value);
    newColumn.tasks = [];

    dispatch({
      type: BoardActionTypes.UPDATE_COLUMNS,
      payload: update(columns, { $splice: [[columns.length, 0, newColumn]] }),
    });

    setLoading(false);
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen} sx={{ minWidth: '300px', margin: '0 5px' }}>
        <AddIcon />
        Add Column
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>Enter the name of new column:</h3>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={value}
            onChange={changeHandler}
          />
          <LoadingButton
            color="primary"
            onClick={handleClick}
            loading={loading}
            loadingPosition="start"
            startIcon={<AddIcon />}
            variant="contained"
            disabled={value === ''}
          >
            Add Column
          </LoadingButton>
        </Box>
      </Modal>
    </>
  );
};

export default AddColumnButton;
