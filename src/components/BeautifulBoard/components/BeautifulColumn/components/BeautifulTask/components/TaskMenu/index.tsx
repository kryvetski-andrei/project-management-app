import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { FunctionComponent, useState } from 'react';
import ApiService from '../../../../../../../../utils/api/responses/board';
import { BoardActionTypes } from '../../../../../../../../utils/types/Board';
import update from 'immutability-helper';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../../../../../../hooks/useTypeSelector';
import { findTask } from '../../../../../../utils/findTaskById';

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

interface ITaskMenuProps {
  taskId: string;
  columnId: string;
}

const TaskMenu: FunctionComponent<ITaskMenuProps> = ({ columnId, taskId }) => {
  const dispatch = useDispatch();
  const { columns } = useTypedSelector((state) => state.board);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteHandler = async () => {
    await ApiService.deleteTask(localStorage.getItem('idBoard')!, columnId, taskId);
    const { columnIndex, taskIndex } = findTask(taskId, columnId, columns);

    dispatch({
      type: BoardActionTypes.UPDATE_COLUMNS,
      payload: update(columns, {
        [columnIndex]: { tasks: { $splice: [[taskIndex, 1]] } },
      }),
    });

    handleClose();
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
        <MenuItem onClick={deleteHandler} sx={{ color: '#d32f2f' }} disableRipple>
          <DeleteOutlineIcon color="error" />
          Delete Task
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default TaskMenu;
