import { Stack, Typography } from '@mui/material';
import React from 'react';

const ErrorPage = () => {
  return (
    <div
      style={{
        height: '100vh',
        background: '#d1d8d5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack spacing={4} alignItems="center">
        <Typography variant="h1">404</Typography>
        <Typography variant="h2">Oops! This Page Not Found!</Typography>
      </Stack>
    </div>
  );
};

export default ErrorPage;
