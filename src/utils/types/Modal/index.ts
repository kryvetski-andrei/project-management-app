export interface ModalProps {
  children?: React.ReactNode;
  buttonCancel?: React.ReactNode;
  buttonAgree?: React.ReactNode;
  title?: string;
  content?: string;
  open: boolean;
  handleClose?(): void;
}
