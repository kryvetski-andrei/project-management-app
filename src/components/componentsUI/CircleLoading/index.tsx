import { CircularProgress } from '@mui/material';

const style = {
  display: 'flex',
  height: 'calc(100vh - 122px)',
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
