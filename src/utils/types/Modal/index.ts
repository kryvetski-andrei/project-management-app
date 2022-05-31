export interface ModalProps {
  open: boolean;
  onClose(value: React.SetStateAction<boolean>): void;
  children?: React.ReactNode;
  buttonCancel?: React.ReactNode;
  buttonAgree?: React.ReactNode;
  title?: string;
  content?: string;
}
