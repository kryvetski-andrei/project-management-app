import { Button, TextField } from '@mui/material';
import { FormEvent, ReactElement } from 'react';
import styles from './index.module.scss';

function SignUpForm(): ReactElement {
  function onSubmit(e: FormEvent): void {
    e.preventDefault();
  }

  return (
    <form onSubmit={onSubmit} className={styles['sign-up-form']}>
      <TextField label="Name" variant="outlined" sx={{ marginBottom: '1rem' }} color="success" />
      <TextField label="Login" variant="outlined" sx={{ marginBottom: '1rem' }} color="success" />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        sx={{ marginBottom: '1.5rem' }}
        color="success"
      />
      <Button type="submit" color="success" variant="contained">
        Sign up
      </Button>
    </form>
  );
}

export default SignUpForm;
