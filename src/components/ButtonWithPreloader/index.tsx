import { Box, Button, CircularProgress } from '@mui/material';
import { ButtonProps } from '../../utils/types/ButtonWithPreloader';

const ButtonWithPreloader = ({ isLoading, content, onClick, disabled }: ButtonProps) => {
  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      <Button onClick={onClick} disabled={isLoading ? true : disabled} variant="contained">
        {content}
      </Button>
      {isLoading && (
        <CircularProgress
          size={24}
          sx={{
            color: '#434545',
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </Box>
  );
};

export default ButtonWithPreloader;
