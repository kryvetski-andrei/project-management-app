import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  BASE_URL,
  temporaryBoardIdPath,
  temporaryToken,
  temporaryUserId,
} from '../../../../../../utils/api/config';
import { FC } from 'react';
import { useTypedSelector } from '../../../../../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import update from 'immutability-helper';
import { findColumnById } from '../../../../utils/findColumnById';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

interface ColumnMenuProps {
  boardId: string;
  columnId: string;
}

export const ColumnMenu: FC<ColumnMenuProps> = ({ boardId, columnId }) => {
  const { columns } = useTypedSelector((state) => state.board);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [taskTitleValue, setTaskTitleValue] = React.useState('');
  const [taskDescriptionValue, setDescriptionTitleValue] = React.useState('');
  const changeTaskTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitleValue(event.target.value);
  };
  const changeTaskDescriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionTitleValue(event.target.value);
  };
  const handleCrateTask = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/boards/${temporaryBoardIdPath}/columns/${columnId}/tasks`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${temporaryToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: taskTitleValue,
            description: taskDescriptionValue,
            userId: temporaryUserId,
          }),
        }
      );
      const task = await response.json();
      console.log(task);
      console.log(columns);
      const { index } = findColumnById(columns, columnId);

      dispatch({
        type: 'UPDATE_COLUMNS',
        payload: update(columns, {
          [index]: { tasks: { $splice: [[0, 0, task]] } },
          //TODO change dropZoneId to dropZoneOrder or dropZoneIndex
        }),
      });
      setLoading(false);
      setTimeout(() => {
        setOpenModal(false);
      }, 500);
    } catch (e) {}
  };

  const [confirmation, setConfirmation] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenCreateTaskModal = () => {
    setAnchorEl(null);
    setConfirmation(false);
    handleOpenModal();
  };

  const handleOpenConfirmDeleteModal = () => {
    setAnchorEl(null);
    setConfirmation(true);
    handleOpenModal();
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await fetch(`${BASE_URL}/boards/${boardId}/columns/${columnId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${temporaryToken}`,
        },
      });

      const { index } = findColumnById(columns, columnId);

      dispatch({
        type: 'UPDATE_COLUMNS',
        payload: update(columns, {
          $splice: [[index, 1]],
        }),
      });
      setLoading(false);
      setAnchorEl(null);
    } catch (e) {}
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpenCreateTaskModal} disableRipple>
          <AddIcon fontSize="large" />
          Add Task
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleOpenConfirmDeleteModal}
          disableRipple
          color="warning"
          sx={{ color: 'red' }}
        >
          <DeleteOutlineIcon sx={{ color: 'red' }} />
          Delete
        </MenuItem>
      </StyledMenu>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {confirmation ? (
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              If you understand the consequences...
            </Typography>

            <Box
              component="form"
              sx={{ '& > :not(style)': { width: '100%' } }}
              noValidate
              autoComplete="off"
            >
              <LoadingButton
                color="error"
                onClick={handleDelete}
                loading={loading}
                loadingPosition="start"
                startIcon={<DeleteOutlineIcon />}
                variant="contained"
              >
                Delete this Column
              </LoadingButton>
            </Box>
          </Box>
        ) : (
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create new task
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
                label="Enter task title"
                variant="outlined"
                value={taskTitleValue}
                onChange={changeTaskTitleHandler}
              />
              <TextField
                id="outlined-basic"
                label="Enter task description"
                variant="outlined"
                value={taskDescriptionValue}
                onChange={changeTaskDescriptionHandler}
              />
              <LoadingButton
                color="primary"
                onClick={handleCrateTask}
                loading={loading}
                loadingPosition="start"
                startIcon={<AddIcon />}
                variant="contained"
              >
                Add this task
              </LoadingButton>
            </Box>
          </Box>
        )}
      </Modal>
    </div>
  );
};
