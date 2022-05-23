import { Button, Link, TextField } from '@mui/material';
import { FormEvent, ReactElement } from 'react';
import styles from './index.module.scss';

function LogInForm(): ReactElement {
  function onSubmit(e: FormEvent): void {
    e.preventDefault();
  }

  return (
    <form onSubmit={onSubmit} className={styles['log-in-form']}>
      <TextField label="Login" variant="outlined" sx={{ marginBottom: '1rem' }} color="success" />
      <TextField
        type="password"
        label="Password"
        variant="outlined"
        sx={{ marginBottom: '1.5rem' }}
        color="success"
      />
      <Button type="submit" color="success" variant="contained" sx={{ marginBottom: '1rem' }}>
        Log in
      </Button>
      <Link href="/signup" underline="hover">
        Don&apos;t have an account? Sign up
      </Link>
    </form>
  );
}

export default LogInForm;
