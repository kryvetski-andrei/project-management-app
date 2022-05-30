import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ButtonsProps {
  disable: boolean;
  openModalConfirm(): void;
  validateForm(): void;
}

const Buttons = ({ disable, validateForm, openModalConfirm }: ButtonsProps) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Button onClick={goBack} variant="contained" size="large" fullWidth>
          Back
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          onClick={validateForm}
          disabled={disable}
          variant="contained"
          size="large"
          fullWidth
        >
          Save
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={openModalConfirm} variant="contained" size="large" color="error" fullWidth>
          Delete profile
        </Button>
      </Grid>
    </Grid>
  );
};

export default Buttons;
