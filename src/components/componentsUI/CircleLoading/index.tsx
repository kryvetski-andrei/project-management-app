import { CircularProgress } from '@mui/material';

const style = {
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
};

export const CircleLoading = () => {
  return (
    <div style={style}>
      <CircularProgress />
    </div>
  );
};
