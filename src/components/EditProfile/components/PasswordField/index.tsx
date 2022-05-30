import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useState } from 'react';

interface PasswordFieldProps {
  error: boolean;
  value: string;
  helperText: string | undefined;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}
const PasswordField = ({ error, value, helperText, onChange }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <FormControl
      sx={{ m: 1, maxWidth: '50ch', minHeight: '82px', width: '100%' }}
      variant="outlined"
      error={error}
    >
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        aria-describedby="my-helper-text"
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      <FormHelperText id="my-helper-text">{helperText}</FormHelperText>
    </FormControl>
  );
};

export default PasswordField;
