import { Avatar, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthActionTypes, TOKEN_STORAGE_NAME } from '../../../utils/types/authorization';

function Profile(): ReactElement {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const open = Boolean(anchorEl);

  function handleClick(event: React.MouseEvent<HTMLElement>): void {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(): void {
    setAnchorEl(null);
  }

  function signout(): void {
    localStorage.removeItem(TOKEN_STORAGE_NAME);
    dispatch({ type: AuthActionTypes.UPDATE_TOKEN, payload: null });
    navigation('/login');
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'profile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar sx={{ width: 32, height: 32 }}></Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="profile-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>Edit profile</MenuItem>
        <Divider />
        <MenuItem onClick={signout}>Sign out</MenuItem>
      </Menu>
    </>
  );
}

export default Profile;
