import { User } from "./user";

export interface AuthState {
  user: User;
  accessToken: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}
