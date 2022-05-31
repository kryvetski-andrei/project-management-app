import { Backdrop, CircularProgress } from '@mui/material';

const Preloader = ({ open }: { open: boolean }) => {
  return (
    <Backdrop open={open} sx={{ color: '#f5f2f2', zIndex: '2' }}>
      <CircularProgress color="inherit" size={80} />
    </Backdrop>
  );
};

export default Preloader;
