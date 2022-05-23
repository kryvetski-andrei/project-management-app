import { Board } from '../MainPage.ts/index';

export interface BoardListProps {
  boards: Board[];
  onClick(e: React.UIEvent<HTMLButtonElement>): void;
}
