import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FunctionComponent, useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ApiService from '../../../../../../../../utils/api/responses/board';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../../../../../../hooks/useTypeSelector';
import { BoardActionTypes } from '../../../../../../../../utils/types/Board';
import update from 'immutability-helper';
import { findColumnById } from '../../../../../../utils/findColumnById';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { TextField } from '@mui/material';

interface Modal {
  setCreationTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  creationTaskModal: boolean;
  columnId: string;
}

const CreationTaskModal: FunctionComponent<Modal> = ({
  setCreationTaskModal,
  creationTaskModal,
  columnId,
}) => {
  const dispatch = useDispatch();
  const { columns } = useTypedSelector((state) => state.board);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

  const handleClose = () => {
    setCreationTaskModal(false);
  };

  const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
  };

  const changeDescriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionValue(event.target.value);
  };

  const handleAddTask = async () => {
    setLoading(true);
    const task = await ApiService.postTask(columnId, {
      title: titleValue,
      description: descriptionValue,
    });

    const { index } = findColumnById(columns, columnId);

    dispatch({
      type: BoardActionTypes.UPDATE_COLUMNS,
      payload: update(columns, {
        [index]: { tasks: { $splice: [[0, 0, task]] } },
      }),
    });
    setLoading(false);
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={creationTaskModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Fill the form to create a task'}</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ width: '100%', margin: '10px 0 20px 0' }}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={titleValue}
            onChange={changeTitleHandler}
            autoComplete={'off'}
          />
          <TextField
            sx={{ width: '100%' }}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            value={descriptionValue}
            onChange={changeDescriptionHandler}
            multiline={true}
            autoComplete={'off'}
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            sx={{ width: '100%' }}
            color="success"
            onClick={handleAddTask}
            loading={loading}
            loadingPosition="start"
            startIcon={<AutoFixHighIcon />}
            variant="contained"
            disabled={descriptionValue === '' || titleValue === ''}
          >
            Create this task in the column
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreationTaskModal;
