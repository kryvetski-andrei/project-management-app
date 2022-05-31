import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Divider from '@mui/material/Divider';
import { BASE_URL } from '../../../../../../../../utils/api/config';
import { FC, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '@mui/material/Modal';
import update from 'immutability-helper';
import { useTypedSelector } from '../../../../../../../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { BoardActionTypes } from '../../../../../../../../utils/types/Board';

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

interface TaskMenuProps {
  boardId: string;
  columnId: string;
  taskId: string;
}

export const TaskMenu: FC<TaskMenuProps> = ({ boardId, columnId, taskId }) => {
  const { columns } = useTypedSelector((state) => state.board);
  const { token, userId } = useTypedSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [openModal, setOpenModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const findTask = useCallback(
    (taskId: string, columnId: string) => {
      const column = columns.filter((c) =>
        c.tasks.includes(c.tasks.filter((t) => `${t.id}` === taskId)[0])
      )[0];
      const task = column.tasks.filter((t) => `${t.id}` === taskId)[0];

      return {
        task,
        taskIndex: column.tasks.indexOf(task),
        column,
        columnIndex: columns.indexOf(column),
      };
    },
    [columns]
  );

  const handleDelete = async () => {
    setAnchorEl(null);
    setLoading(true);
    await fetch(`${BASE_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { columnIndex, taskIndex } = findTask(taskId, columnId);

    dispatch({
      type: BoardActionTypes.UPDATE_COLUMNS,
      payload: update(columns, {
        [columnIndex]: { tasks: { $splice: [[taskIndex, 1]] } },
      }),
    });
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
        <MenuItem onClick={handleClose} disableRipple>
          <EditIcon />
          Edit Task
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleOpenModal} disableRipple color="warning" sx={{ color: 'red' }}>
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
              Delete this Task
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
