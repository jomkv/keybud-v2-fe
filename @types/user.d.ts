export interface User {
  id: number;
  googleId?: string;
  username: string;
  email: string;
  switchType: string;
}

export interface UserState {
  user: User | null;
}
