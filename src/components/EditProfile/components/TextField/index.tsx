import { TextField } from '@mui/material';

interface FieldProps {
  error: boolean;
  helperText: string | undefined;
  id: string;
  label: string;
  defaultValue: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}
const Field = ({ error, helperText, id, label, defaultValue, onChange }: FieldProps) => {
  return (
    <TextField
      error={error}
      helperText={helperText}
      id={id}
      label={label}
      type="text"
      defaultValue={defaultValue}
      onChange={onChange}
      sx={{ minHeight: '82px' }}
    />
  );
};

export default Field;
