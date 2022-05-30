export interface Board {
  id: string;
  title: string;
  description: string;
}

export interface MainReducersState {
  openModal: boolean;
  idBoard: string;
  boards: Board[];
  isLoading: boolean;
  activeModal: string;
  status: string | null;
  error: string | null;
}

export interface NewBoard {
  title: string;
  description: string;
}

export interface BoardItem extends NewBoard {
  id: string;
}

export interface Errors {
  title?: string;
  description?: string;
}
