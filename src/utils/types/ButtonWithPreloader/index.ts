export interface ButtonProps {
  onClick(): void;
  isLoading: boolean;
  content?: string;
  disabled?: boolean;
}
