import { Alert, Button, Link, Snackbar, TextField } from '@mui/material';
import { ReactElement, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { signin } from '../../utils/api/authorization';
import { objIsIApiError } from '../../utils/types/api';
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

  function closeError() {
    setError({ show: false, msg: '' });
  }

  async function onSubmit(data: FieldValues): Promise<void> {
    const payload = await signin(data.login, data.password);
    console.log(payload);

    if (objIsIApiError(payload)) {
      setError({ show: true, msg: payload.message.toString() });
      return;
    }

    console.log(payload.token);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['log-in-form']}>
      <TextField
        {...register('login', { required: 'is empty' })}
        label="Login"
        variant="outlined"
        sx={{ marginBottom: '1rem' }}
        color="success"
        error={errors['login'] !== undefined}
        helperText={errors['login']?.message}
      />
      <TextField
        {...register('password', { required: 'is empty' })}
        type="password"
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
