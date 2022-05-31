import { UserToken } from '../types/EditProfile';

export const parseToken = (token: string): UserToken => {
  return JSON.parse(atob(token.split('.')[1]));
};
