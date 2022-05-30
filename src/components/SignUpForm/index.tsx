import { Alert, Button, Snackbar, TextField } from '@mui/material';
import { ReactElement, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../utils/api/authorization';
import { objIsIApiError } from '../../utils/types/api';
import styles from './index.module.scss';

function SignUpForm(): ReactElement {
  const [error, setError] = useState({
    show: false,
    msg: '',
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  const navigate = useNavigate();

  function closeError() {
    setError({ show: false, msg: '' });
  }

  async function onSubmit(data: FieldValues): Promise<void> {
    const payload = await signup(data.name, data.login, data.password);

    if (objIsIApiError(payload)) {
      setError({ show: true, msg: payload.message.toString() });
      return;
    }

    navigate('/login');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['sign-up-form']}>
      <TextField
        {...register('name', { required: 'is empty' })}
        label="Name"
        placeholder="name"
        variant="outlined"
        sx={{ marginBottom: '1rem' }}
        color="success"
        error={errors['name'] !== undefined}
        helperText={errors['name']?.message}
      />
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
        label="Password"
        placeholder="password"
        variant="outlined"
        sx={{ marginBottom: '1.5rem' }}
        color="success"
        error={errors['password'] !== undefined}
        helperText={errors['password']?.message}
      />
      <Button type="submit" color="success" variant="contained">
        Sign up
      </Button>
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
