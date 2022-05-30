import { Alert, AlertColor, Snackbar } from '@mui/material';

interface MessageHandlerProps {
  open: boolean;
  setClose(value: React.SetStateAction<boolean>): void;
  severity: AlertColor;
  text: string | null;
}
const MessageHandler = ({ open, severity, text, setClose }: MessageHandlerProps) => {
  const closeMessage = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setClose(false);
  };
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={closeMessage}>
      <Alert onClose={closeMessage} variant="filled" severity={severity} sx={{ width: '100%' }}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default MessageHandler;
