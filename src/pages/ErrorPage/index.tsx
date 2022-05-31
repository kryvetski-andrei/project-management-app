import { Stack, Typography } from '@mui/material';
import classes from './index.module.scss';

const ErrorPage = () => {
  return (
    <div className={classes.wrapper}>
      <Stack spacing={4}>
        <Typography variant="h1">404</Typography>
        <Typography variant="h2">This Page Not Found!</Typography>
      </Stack>
    </div>
  );
};

export default ErrorPage;
