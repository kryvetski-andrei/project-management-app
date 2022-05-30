import { Alert, Button, Link, Snackbar, TextField } from '@mui/material';
import { ReactElement, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserIdFromToken } from '../../store/reducers/authReducer';
import { signin } from '../../utils/api/authorization';
import { objIsIApiError } from '../../utils/types/api';
import { AuthActionTypes, TOKEN_STORAGE_NAME } from '../../utils/types/authorization';
import styles from './index.module.scss';

function LogInForm(): ReactElement {
  const [error, setError] = useState({
    show: false,
    msg: '',
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  const dispatch = useDispatch();
  const navigation = useNavigate();

  function closeError() {
    setError({ show: false, msg: '' });
  }

  async function onSubmit(data: FieldValues): Promise<void> {
    const payload = await signin(data.login, data.password);

    if (objIsIApiError(payload)) {
      setError({ show: true, msg: payload.message.toString() });
      return;
    }

    localStorage.setItem(TOKEN_STORAGE_NAME, payload.token);
    dispatch({ type: AuthActionTypes.UPDATE_TOKEN, payload: payload.token });
    dispatch({ type: AuthActionTypes.UPDATE_USER_ID, payload: getUserIdFromToken(payload.token) });
    navigation('/');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['log-in-form']}>
      <TextField
        {...register('login', { required: 'is empty' })}
        label="Login"
        placeholder="login"
        variant="outlined"
        sx={{ marginBottom: '1rem' }}
        color="success"
        error={errors['login'] !== undefined}
        helperText={errors['login']?.message}
      />
      <TextField
        {...register('password', { required: 'is empty' })}
        type="password"
        placeholder="password"
        label="Password"
        variant="outlined"
        sx={{ marginBottom: '1.5rem' }}
        color="success"
        error={errors['password'] !== undefined}
        helperText={errors['password']?.message}
      />
      <Button type="submit" color="success" variant="contained" sx={{ marginBottom: '1rem' }}>
        Log in
      </Button>
      <Link href="/signup" underline="hover">
        Don&apos;t have an account? Sign up
      </Link>
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

export default LogInForm;
