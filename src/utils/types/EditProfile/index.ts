export interface EditProfileState {
  openModal: boolean;
  user: UserData;
  userId: string;
  isLoading: boolean;
  status: string | null;
  error: string | null;
}

export interface UserToken {
  iat: number;
  login: string;
  userId: string;
}

export interface UserData {
  id: string;
  name: string;
  login: string;
}

export interface UserUpdate {
  name: string;
  login: string;
  password: string;
}

export interface Errors {
  name?: string;
  login?: string;
  password?: string;
}
