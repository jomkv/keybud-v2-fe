export interface User {
  id: number;
  googleId?: string;
  username: string;
  email: string;
  switchType: string;
}

export interface UserPayload extends User {
  _count: {
    followers: number;
    followings: number;
  };
}

export interface UserState {
  user: UserPayload | null;
}
