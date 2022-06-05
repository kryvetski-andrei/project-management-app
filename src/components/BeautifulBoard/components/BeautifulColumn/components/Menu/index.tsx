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
import ConformationModal from './components/ConfirmationModal';
import { FunctionComponent, useState } from 'react';
import CreationTaskModal from './components/CreationTaskModal';

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

interface IColumnMenuProps {
  columnId: string;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ColumnMenu: FunctionComponent<IColumnMenuProps> = ({ columnId, editMode, setEditMode }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  const [creationTaskModal, setCreationTaskModal] = useState<boolean>(false);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openConfirmationModal = () => {
    setConfirmationModal(true);
    setAnchorEl(null);
  };

  const openTaskCreateModal = () => {
    setCreationTaskModal(true);
    setAnchorEl(null);
  };

  const turnOnEditMode = () => {
    setEditMode(true);
    setAnchorEl(null);
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
        <MenuItem onClick={turnOnEditMode} disableRipple>
          <EditIcon />
          Edit Column
        </MenuItem>
        <Divider />
        <MenuItem onClick={openTaskCreateModal} disableRipple>
          <AddIcon />
          Add Task
        </MenuItem>
        <Divider />
        <MenuItem onClick={openConfirmationModal} sx={{ color: '#d32f2f' }} disableRipple>
          <DeleteOutlineIcon color="error" />
          Delete Column
        </MenuItem>
      </StyledMenu>
      <ConformationModal
        setConfirmationModal={setConfirmationModal}
        confirmationModal={confirmationModal}
        columnId={columnId}
      />
      <CreationTaskModal
        setCreationTaskModal={setCreationTaskModal}
        creationTaskModal={creationTaskModal}
        columnId={columnId}
      />
    </div>
  );
};

export default ColumnMenu;
