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
import { findColumnById } from '../../../../../../../Board/utils/findColumnById';

interface Modal {
  isModalOpen: boolean;
  columnId: string;
}

const ConfirmationModal: FunctionComponent<Modal> = ({ isModalOpen, columnId }) => {
  const dispatch = useDispatch();
  const { columns } = useTypedSelector((state) => state.board);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOpen(isModalOpen);
  }, [isModalOpen]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    await ApiService.deleteColumn(localStorage.getItem('idBoard')!, columnId);

    const { index } = findColumnById(columns, columnId);

    dispatch({
      type: BoardActionTypes.UPDATE_COLUMNS,
      payload: update(columns, {
        $splice: [[index, 1]],
      }),
    });

    setLoading(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'If you understand the consequences, delete this column'}
        </DialogTitle>
        <DialogActions>
          <LoadingButton
            sx={{ width: '100%' }}
            color="error"
            onClick={handleDelete}
            loading={loading}
            loadingPosition="start"
            startIcon={<DeleteOutlineIcon />}
            variant="contained"
          >
            Delete this column
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmationModal;
