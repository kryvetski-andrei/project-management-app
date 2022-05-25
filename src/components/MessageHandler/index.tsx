import { Alert, AlertColor, Snackbar } from '@mui/material';

interface MessageHandlerProps {
  open: boolean;
  onClose(
    event?: Event | React.SyntheticEvent<Element, Event> | undefined,
    reason?: string | undefined
  ): void;
  severity: AlertColor;
  text: string | null;
}
const MessageHandler = ({ open, onClose, severity, text }: MessageHandlerProps) => {
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
      <Alert onClose={onClose} variant="filled" severity={severity} sx={{ width: '100%' }}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default MessageHandler;
