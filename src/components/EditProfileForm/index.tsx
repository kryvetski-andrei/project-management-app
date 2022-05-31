import { Alert, Button, IconButton, Snackbar, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { objIsIApiError } from '../../utils/types/api';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './index.module.scss';
import { deleteUser, getUserById, updateUser } from '../../utils/api/users';
import { useDispatch } from 'react-redux';
import { pagesPath } from '../../utils/config';
import { AuthActionTypes, TOKEN_STORAGE_NAME } from '../../utils/types/authorization';

function SignUpForm(): ReactElement {
  const [error, setError] = useState({
    show: false,
    msg: '',
  });

  const token = useTypedSelector((state) => state.auth.token);
  const userId = useTypedSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  const loadUserData = useCallback(async () => {
    try {
      if (userId !== null && token !== null) {
        const payload = await getUserById(token, userId);

        if (typeof payload === 'object' && objIsIApiError(payload)) {
          throw new Error(payload.message.toString());
        }

        reset({
          name: payload.name,
          login: payload.login,
        });
      }
    } catch (e) {
      if (e instanceof Error) {
        setError({ show: true, msg: e.message });
      }
    }
  }, [token, userId, reset]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  function closeError() {
    setError({ show: false, msg: '' });
  }

  async function onSubmit(data: FieldValues): Promise<void> {
    try {
      if (userId !== null && token !== null) {
        const payload = await updateUser(token, userId, {
          name: data.name,
          login: data.login,
          password: data.password,
        });

        if (typeof payload === 'object' && objIsIApiError(payload)) {
          throw new Error(payload.message.toString());
        }

        navigate(pagesPath.mainPagePath);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError({ show: true, msg: e.message });
      }
    }
  }

  async function onDelete(): Promise<void> {
    try {
      if (userId !== null && token !== null) {
        const payload = await deleteUser(token, userId);

        if (typeof payload === 'object' && objIsIApiError(payload)) {
          throw new Error(payload.message.toString());
        }

        localStorage.removeItem(TOKEN_STORAGE_NAME);
        dispatch({ type: AuthActionTypes.UPDATE_TOKEN, payload: null });
        navigate(pagesPath.loginPagePath);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError({ show: true, msg: e.message });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['edit-profile-form']}>
      <TextField
        {...register('name', { required: 'is empty', value: '' })}
        label="Name"
        placeholder="name"
        variant="outlined"
        sx={{ marginBottom: '1rem' }}
        color="success"
        error={errors['name'] !== undefined}
        helperText={errors['name']?.message}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        {...register('login', { required: 'is empty', value: '' })}
        label="Login"
        placeholder="login"
        variant="outlined"
        sx={{ marginBottom: '1rem' }}
        color="success"
        error={errors['login'] !== undefined}
        helperText={errors['login']?.message}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        {...register('password', { required: 'is empty' })}
        type="password"
        label="Password"
        placeholder="password"
        variant="outlined"
        sx={{ marginBottom: '1.5rem' }}
        color="success"
        error={errors['password'] !== undefined}
        helperText={errors['password']?.message}
        InputLabelProps={{ shrink: true }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button type="submit" color="success" variant="contained">
          Edit profile
        </Button>
        <IconButton onClick={onDelete} color="error" aria-label="delete user" title="Delete user">
          <DeleteIcon />
        </IconButton>
      </Box>
      <Snackbar
        open={error.show}
        autoHideDuration={6000}
        onClose={closeError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
          {error.msg}
        </Alert>
      </Snackbar>
    </form>
  );
}

export default SignUpForm;
