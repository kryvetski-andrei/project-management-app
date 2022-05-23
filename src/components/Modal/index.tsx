import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { ModalProps } from '../../utils/types/Modal';

const Modal = ({
  title,
  content,
  children,
  buttonCancel,
  buttonAgree,
  open,
  handleClose,
}: ModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle sx={{ textAlign: 'center' }}>{title}</DialogTitle>
      <DialogContent sx={{ textAlign: 'center' }}>
        <DialogContentText>{content}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        {buttonCancel}
        {buttonAgree}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
